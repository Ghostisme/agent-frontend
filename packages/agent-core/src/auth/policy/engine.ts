import type { ConditionFn, PolicyCheck, PolicyExpression, Subject } from "./types";

export class PolicyEngine {
  private conditions = new Map<string, ConditionFn>();
  private getSubject: () => Subject | null;

  constructor(getSubject: () => Subject | null) {
    this.getSubject = getSubject;
  }

  registerCondition(name: string, fn: ConditionFn) {
    this.conditions.set(name, fn);
  }

  async can(expr?: PolicyExpression): Promise<boolean> {
    if (!expr) return true;
    if ("anyOf" in expr) {
      for (const e of expr.anyOf) if (await this.can(e)) return true;
      return false;
    }
    if ("allOf" in expr) {
      for (const e of expr.allOf) if (!(await this.can(e))) return false;
      return true;
    }
    return this.check(expr);
  }

  private async check(check: PolicyCheck): Promise<boolean> {
    const s = this.getSubject();
    if (!s) return false;

    if (check.rolesAny?.length) {
      if (!s.roles?.some(r => check.rolesAny!.includes(r))) return false;
    }
    if (check.rolesAll?.length) {
      if (!(check.rolesAll!.every(r => s.roles?.includes(r)))) return false;
    }
    if (check.permsAny?.length) {
      if (!s.permissions?.some(p => check.permsAny!.includes(p))) return false;
    }
    if (check.permsAll?.length) {
      if (!(check.permsAll!.every(p => s.permissions?.includes(p)))) return false;
    }

    if (check.conditions?.length) {
      for (const c of check.conditions) {
        const fn = this.conditions.get(c.name);
        if (!fn) return false;
        const ok = await fn({ subject: s, resource: check.resource, action: check.action, args: c.args });
        if (!ok) return false;
      }
    }
    return true;
  }
}