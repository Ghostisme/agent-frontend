import { createBrowserRouter, RouterProvider, Outlet, type RouteObject, useLocation, useNavigate, Navigate } from "react-router-dom";
import { PolicyProvider, useSubject } from "@nexus/agent-core/auth/policy/PolicyProvider.tsx";
import { GlobalRouteGuard } from "@nexus/agent-core/auth/policy/GlobalRouteGuard.tsx";
// import { ThemeProvider } from "./components/theme-provider";
import TwoPaneLayout, { type TwoPaneLayoutSchema } from "@nexus/ui/components/TwoLayout/index";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";
import { ThemeProvider } from "@nexus/ui/themes/ThemeProvider.tsx";
import { lightSeed, type ThemeSpec } from "@nexus/ui/themes/tokens.ts";

const TENANT_REQUIRED = "t1";
const WINDOW = { start: 1710000000000, end: 1890000000000 };

const theme: ThemeSpec = {
  token: {
    ...lightSeed,
    // 可在此覆盖
    colorPrimary: "#1677ff",
    // colorText: "...",
    // colorBgContainer: "...",
  },
  components: {
    Button: {
      controlHeight: 36,
      // colorPrimary: "#1677ff",
    }
  },
  // prefix: "nxs" // 可不传，默认就是 nxs
};

function Shell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { subject } = useSubject(); // 用于同步隐藏无权限菜单
  // const hasRole = (roles?: string[]) => !roles?.length || roles.some(r => subject?.roles?.includes(r));

  const canSeeAdmin = (() => {
    const roleOk = !!subject?.roles?.includes("admin");
    const tenantOk = subject?.tenantId === TENANT_REQUIRED;
    const now = Date.now();
    const timeOk = now >= WINDOW.start && now <= WINDOW.end;
    return roleOk && tenantOk && timeOk;
  })();

  // const layoutSchema: TwoPaneLayoutSchema = {
  //   sidebar: {
  //     visible: true,
  //     collapsible: true,
  //     menu: [
  //       { id: "home", label: "首页", route: "/", roles: ['user'], active: pathname === "/" },
  //       { id: "admin", label: "管理后台", route: "/admin", roles: ['admin'], active: pathname.startsWith("/admin") }
  //     ]
  //   },
  //   header: { visible: true, content: <div className="font-semibold">Web 子应用</div> },
  //   maxWidth: "xl"
  // };
  const schema: TwoPaneLayoutSchema = {
    sidebar: {
      visible: true,
      collapsible: true,
      menu: [
        { id: "home", label: "首页（公开）", route: "/", active: pathname === "/" },
        // 需权限 + ABAC 的菜单项
        { id: "admin", label: "管理（需权限）", route: "/admin", roles: ["admin"], active: pathname.startsWith("/admin") }
      ]
    },
    header: { visible: true, content: <div className="font-semibold">Web 子应用</div> },
    maxWidth: "xl"
  };

  return (
    <ThemeProvider 
      // defaultTheme="light"
      theme={theme}
    >
      <GlobalRouteGuard />
      <TwoPaneLayout
        schema={schema}
        onMenuClick={(item) => {
          // if (item.route) window.history.pushState({}, "", item.route);
          if (item.route) navigate(item.route);
          // window.dispatchEvent(new PopStateEvent("popstate"));
        }}
        canAccess={(roles) => !roles?.length ? true : canSeeAdmin}
      >
        {/* {children} */}
        <Outlet />
      </TwoPaneLayout>
    </ThemeProvider>
  );
}

const routes: RouteObject[] = [
  {
    path: "/",
    // handle: {
    //   policy: { anyOf: [{ rolesAny: [] }] } // 公开页面
    // },
    element: <Shell />,
    children: [
      { index: true, element: <Home />, handle: { policy: { anyOf: [{ rolesAny: [] }] } } }, // 公开
      {
        path: "admin",
        element: <Admin />,
        handle: {
          requireAuth: true,
          policy: {
            allOf: [
              { rolesAny: ["admin"] },
              {
                conditions: [
                  { name: "tenantMatch", args: { tenantId: TENANT_REQUIRED } },
                  { name: "timeWindow", args: WINDOW }
                ]
              }
            ]
          },
          onDenyRedirect: "/access-denied"
        }
      },
      { path: "login", element: <Login /> },
      { path: "access-denied", element: <AccessDenied /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  },
  // { path: "*", element: <Navigate to="/" replace /> }
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <PolicyProvider
      initialSubject={null}
      conditions={{
        tenantMatch: ({ subject, args }) => subject?.tenantId === args?.tenantId,
        timeWindow: ({ args }) => {
          const now = Date.now();
          return now >= (args?.start ?? 0) && now <= (args?.end ?? Infinity);
        },
        featureFlag: ({ args }) => {
          const flags = { "beta-orders": true } as const;
          const key = args?.key as keyof typeof flags | undefined;
          return key ? flags[key] : false;
        }
      }}
    >
      <RouterProvider router={router} />
    </PolicyProvider>
  );
}