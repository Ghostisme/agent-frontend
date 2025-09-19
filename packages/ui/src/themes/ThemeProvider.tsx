import * as React from "react";
import { derive } from "./algorithm";
import type { ThemeSpec, GlobalToken, ComponentTokens } from "./tokens";

type Props = {
  theme: ThemeSpec;
  children: React.ReactNode;
  containerSelector?: string; // 默认 document.documentElement
};

function toKebab(input: string) {
  return input.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
}

function applyVars(
  el: HTMLElement,
  prefix: string,
  token: GlobalToken,
  components?: ComponentTokens
) {
  const set = (name: string, val: string | number | undefined) => {
    if (val === undefined) return;
    el.style.setProperty(`--${prefix}-${name}`, String(val));
  };

  // 全局 token
  const g = derive(token);
  Object.entries(g).forEach(([k, v]) => set(toKebab(k), v as any));

  // 组件 token（优先级高于全局）
  Object.entries(components ?? {}).forEach(([comp, obj]) => {
    Object.entries(obj ?? {}).forEach(([k, v]) => {
      set(`${comp}-${toKebab(k)}`, v as any);
    });
  });
}

export const ThemeProvider: React.FC<Props> = ({ theme, children, containerSelector }) => {
  React.useEffect(() => {
    const el =
      (containerSelector
        ? document.querySelector(containerSelector)
        : document.documentElement) as HTMLElement | null;
    if (!el) return;

    const prefix = theme.prefix || "nxs";
    applyVars(el, prefix, theme.token, theme.components);
  }, [theme, containerSelector]);

  return <>{children}</>;
};