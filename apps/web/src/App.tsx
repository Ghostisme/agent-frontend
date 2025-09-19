import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { PolicyProvider } from "@nexus/agent-core/auth/policy/PolicyProvider.tsx";
import { GlobalRouteGuard } from "@nexus/agent-core/auth/policy/GlobalRouteGuard.tsx";
import TwoPaneLayout, { type TwoPaneLayoutSchema } from "@nexus/ui/components/TwoLayout/index";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";

const layoutSchema: TwoPaneLayoutSchema = {
  sidebar: {
    visible: true,
    collapsible: true,
    menu: [
      { id: "home", label: "首页", route: "/", roles: ['user'] },
      { id: "admin", label: "管理后台", route: "/admin", roles: ['user'] }
    ]
  },
  header: { visible: true, content: <div className="font-semibold">Demo</div> },
  maxWidth: "xl"
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalRouteGuard />
      <TwoPaneLayout
        schema={layoutSchema}
        onMenuClick={(item) => {
          if (item.route) window.history.pushState({}, "", item.route);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }}
        canAccess={(roles) => {
          // 简化：布局层不直接判断角色，依赖菜单 roles 控制显隐即可
          return true;
        }}
      >
        {children}
      </TwoPaneLayout>
    </>
  );
}

const routes: RouteObject[] = [
  {
    path: "/",
    handle: {
      policy: { anyOf: [{ rolesAny: [] }] } // 公开页面
    },
    element: (
      <Shell>
        <Home />
      </Shell>
    )
  },
  {
    path: "/admin",
    handle: {
      requireAuth: true,
      policy: { allOf: [{ rolesAny: ["admin"] }, { permsAny: ["admin:read"] }] },
      onDenyRedirect: "/access-denied"
    },
    element: (
      <Shell>
        <Admin />
      </Shell>
    )
  },
  {
    path: "/login",
    element: (
      <Shell>
        <Login />
      </Shell>
    )
  },
  {
    path: "/access-denied",
    element: (
      <Shell>
        <AccessDenied />
      </Shell>
    )
  },
  {
    path: "/orders",
    handle: {
      requireAuth: true,
      policy: {
        allOf: [
          { rolesAny: ["manager", "admin"] },
          { permsAll: ["order:write"] },
          {
            conditions: [
              { name: "tenantMatch", args: { tenantId: "t1" } },
              { name: "timeWindow", args: { start: 1710000000000, end: 1890000000000 } },
              { name: "featureFlag", args: { key: "beta-orders" } }
            ]
          }
        ]
      }
    },
    element: <Shell>...</Shell>
  }
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
          const flags: any = { "beta-orders": true }; // 示例：实际接入配置或远端
          return !!flags[args?.key];
        }
      }}
    >
      <RouterProvider router={router} />
    </PolicyProvider>
  );
}