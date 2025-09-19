import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useLocation, useNavigate, To } from "react-router-dom";
// import { ThemeProvider } from "./components/theme-provider";
import TwoPaneLayout, { type TwoPaneLayoutSchema } from "@nexus/ui/components/TwoLayout/index";
import { GlobalRouteGuard } from "@nexus/agent-core/auth/policy/GlobalRouteGuard.tsx";
import { PolicyProvider } from "@nexus/agent-core/auth/policy/PolicyProvider.tsx";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import { ThemeProvider } from "@nexus/ui/themes/ThemeProvider.tsx";
import { lightSeed, type ThemeSpec } from "@nexus/ui/themes/tokens.ts";

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

  const schema: TwoPaneLayoutSchema = {
    sidebar: {
      visible: true,
      collapsible: true,
      menu: [
        { id: "chat", label: "对话", route: "/chat", active: pathname.startsWith("/chat") },
        { id: "settings", label: "设置", route: "/settings", active: pathname.startsWith("/settings") }
      ]
    },
    header: { visible: true, content: <div className="font-semibold">Agent</div> },
    maxWidth: "xl"
  };

  return (
    <ThemeProvider 
      // defaultTheme="light"
      theme={theme}
    >
      {/* 关键：把 Guard 放进数据路由树内 */}
      <GlobalRouteGuard />
      <TwoPaneLayout
        schema={schema}
        onMenuClick={(item) => { if (item.route) navigate(item.route); }}
      >
        <Outlet />
      </TwoPaneLayout>
    </ThemeProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { index: true, element: <Navigate to="/chat" replace /> },
      { path: "chat", element: <Chat /> },
      { path: "settings", element: <Settings /> }
    ]
  }
]);

export default function App() {
  return (
    <StrictMode>
      <PolicyProvider
        initialSubject={null}
        conditions={{
          // 可选：示例条件，后续使用 Guard/route handle.policy 可引用
          tenantMatch: ({ subject, args }) => subject?.tenantId === args?.tenantId,
          featureFlag: ({ args }) => typeof args?.key === "string"
            ? !!({ "beta-orders": true } as Record<string, boolean>)[args.key]
            : false
        }}
      >
        <RouterProvider router={router} />
      </PolicyProvider>
    </StrictMode>
  );
}