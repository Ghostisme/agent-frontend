import { useSubject } from "@nexus/agent-core/auth/policy/PolicyProvider.tsx";

export default function Login() {
  const { setSubject } = useSubject();

  return (
    <div className="p-6 space-y-4">
      <div className="text-lg font-semibold">登录模拟</div>
      <div className="flex gap-3">
        <button
          className="px-3 py-2 rounded-md border"
          onClick={() =>
            setSubject({
              id: "u_admin",
              name: "Admin",
              roles: ["admin"],
              permissions: ["admin:read", "report:export"],
              tenantId: "t1"
            })
          }
        >
          以 Admin 登录
        </button>
        <button
          className="px-3 py-2 rounded-md border"
          onClick={() =>
            setSubject({
              id: "u_user",
              name: "User",
              roles: ["user"],
              permissions: ["report:view"],
              tenantId: "t1"
            })
          }
        >
          以普通用户登录
        </button>
        <button className="px-3 py-2 rounded-md border" onClick={() => setSubject(null)}>
          登出
        </button>
      </div>
      <p className="text-sm text-muted-foreground">提示：本页仅演示切换主体，实际项目请接入真实登录。</p>
    </div>
  );
}