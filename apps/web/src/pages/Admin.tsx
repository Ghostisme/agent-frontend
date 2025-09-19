export default function Admin() {
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-xl font-semibold">管理后台</h1>
      <p>只有 admin 且具备 admin:read 权限才可访问。</p>
    </div>
  );
}