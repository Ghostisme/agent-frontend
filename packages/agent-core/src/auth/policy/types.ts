export type Subject = {
  id: string;
  name?: string;
  roles?: string[];
  permissions?: string[];
  tenantId?: string;
  orgId?: string;
  attrs?: Record<string, any>;
};

export type PolicyCheck = {
  action?: string;           // view | edit | delete ...
  resource?: string;         // 路由/页面/资源键，如 "admin:dashboard"
  rolesAny?: string[];       // 具备任一角色即可
  rolesAll?: string[];       // 需同时具备
  permsAny?: string[];       // 权限点任一
  permsAll?: string[];       // 权限点同时
  conditions?: Array<{ name: string; args?: any }>; // ABAC 条件列表
};

export type PolicyExpression =
  | { anyOf: PolicyExpression[] }
  | { allOf: PolicyExpression[] }
  | PolicyCheck;

export type ConditionFn = (ctx: {
  subject: Subject | null;
  resource?: string;
  action?: string;
  args?: any;
}) => boolean | Promise<boolean>;

export type RoutePolicyMeta = {
  policy?: PolicyExpression;   // 用于路由 handle
  onDenyRedirect?: string;     // 默认 "/access-denied"
  requireAuth?: boolean;       // 未登录跳转 "/login"
};