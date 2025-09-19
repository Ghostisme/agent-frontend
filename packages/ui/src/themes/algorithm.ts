import type { GlobalToken } from "./tokens";

const clamp = (n: number, a = 0, b = 100) => Math.max(a, Math.min(b, n));

export function derive(global: GlobalToken): GlobalToken {
  // 简化：把 colorPrimary 当作 hsl/hex 都支持，项目里可用更稳健的色彩库
  const toHsl = (c: string) => c.startsWith("hsl") ? c : c; // 留空：若需要可引入 tinycolor
  const hover = "hsl(var(--primary-600))"; // 若已有 HSL 变量体系可直接映射
  const active = "hsl(var(--primary-700))";
  return {
    ...global,
    colorPrimaryHover: global.colorPrimaryHover ?? toHsl(hover),
    colorPrimaryActive: global.colorPrimaryActive ?? toHsl(active),
  };
}