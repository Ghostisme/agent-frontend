export type GlobalToken = {
  colorPrimary: string;
  colorText: string;
  colorTextLightSolid: string;
  colorBgContainer: string;
  colorBorder: string;
  borderRadius: number;
  fontSize: number;
  // 派生色（可由算法生成）
  colorPrimaryHover?: string;
  colorPrimaryActive?: string;
};

export type ComponentTokens = {
  Button?: {
    colorPrimary?: string;
    colorText?: string;
    controlHeight?: number;
    borderRadius?: number;
  };
  // 其他组件...
};

export type ThemeSpec = {
  token: GlobalToken;
  components?: ComponentTokens;
  prefix?: string; // 变量名前缀，默认 nxs
};

export const lightSeed: GlobalToken = {
  colorPrimary: "#1677ff",
  colorText: "hsl(0 0% 10%)",
  colorTextLightSolid: "#fff",
  colorBgContainer: "#fff",
  colorBorder: "hsl(0 0% 90%)",
  borderRadius: 8,
  fontSize: 14,
};