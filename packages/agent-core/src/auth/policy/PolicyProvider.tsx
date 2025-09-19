import React, { createContext, useContext, useMemo, useState } from "react";
import { PolicyEngine } from "./engine";
import type { Subject, ConditionFn } from "./types";

type CtxType = {
  engine: PolicyEngine;
  subject: Subject | null;
  setSubject: (s: Subject | null) => void;
};

const Ctx = createContext<CtxType | null>(null);

export function PolicyProvider({
  initialSubject,
  conditions,
  children
}: {
  initialSubject?: Subject | null;
  conditions?: Record<string, ConditionFn>;
  children: React.ReactNode;
}) {
  const [subject, setSubject] = useState<Subject | null>(initialSubject ?? null);

  const engine = useMemo(() => {
    const e = new PolicyEngine(() => subject);
    Object.entries(conditions ?? {}).forEach(([k, v]) => e.registerCondition(k, v));
    return e;
  }, [subject, conditions]);

  return <Ctx.Provider value={{ engine, subject, setSubject }}>{children}</Ctx.Provider>;
}

export function usePolicy() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePolicy must be used within PolicyProvider");
  return ctx.engine;
}

export function useSubject() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSubject must be used within PolicyProvider");
  return { subject: ctx.subject, setSubject: ctx.setSubject };
}