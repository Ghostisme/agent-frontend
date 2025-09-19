import React, { useEffect } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { usePolicy } from "./PolicyProvider";
import type { RoutePolicyMeta } from "./types";

export function GlobalRouteGuard() {
  const matches = useMatches() as Array<{ handle?: RoutePolicyMeta }>;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const engine = usePolicy();

  useEffect(() => {
    (async () => {
      const meta = [...matches].reverse().find(m => m.handle?.policy || m.handle?.requireAuth)?.handle;
      if (!meta) return;

      const requireAuth = meta.requireAuth ?? false;
      const ok = await engine.can(meta.policy);

      if (!ok) {
        const to = meta.onDenyRedirect ?? "/access-denied";
        navigate(to, { replace: true });
      } else if (requireAuth && !(await engine.can())) {
        navigate("/login", { replace: true });
      }
    })();
  }, [pathname, matches, engine, navigate]);

  return null;
}