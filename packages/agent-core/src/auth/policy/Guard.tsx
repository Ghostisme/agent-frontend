import React from "react";
import { usePolicy } from "./PolicyProvider";
import type { PolicyExpression } from "./types";

export function Guard({
  policy,
  mode = "hide",
  fallback,
  children
}: {
  policy?: PolicyExpression;
  mode?: "hide" | "disable";
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const engine = usePolicy();
  const [allowed, setAllowed] = React.useState<boolean>(false);

  React.useEffect(() => {
    let mounted = true;
    engine.can(policy).then(ok => mounted && setAllowed(ok));
    return () => { mounted = false; };
  }, [engine, policy]);

  if (allowed) return <>{children}</>;
  if (mode === "disable") {
    return <div aria-disabled="true" className="pointer-events-none opacity-50">{children}</div>;
  }
  return <>{fallback ?? null}</>;
}