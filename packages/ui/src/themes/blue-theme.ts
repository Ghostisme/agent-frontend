export const blueTheme = {
  // 按钮组件主题
  button: {
    primary: {
      background: "hsl(var(--primary))",
      foreground: "hsl(var(--primary-foreground))",
      hover: "hsl(var(--primary-600))",
      active: "hsl(var(--primary-700))",
    },
    secondary: {
      background: "hsl(var(--primary-50))",
      foreground: "hsl(var(--primary))",
      hover: "hsl(var(--primary-100))",
      border: "hsl(var(--primary) / 0.2)",
    }
  },
  
  // 表单组件主题
  input: {
    border: "hsl(var(--primary) / 0.2)",
    focusBorder: "hsl(var(--primary))",
    focusRing: "hsl(var(--primary) / 0.2)",
  },
  
  // 卡片组件主题
  card: {
    border: "hsl(var(--primary) / 0.1)",
    shadow: "0 1px 3px 0 hsl(var(--primary) / 0.1)",
  }
}