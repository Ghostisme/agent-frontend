/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 响应式断点配置
      screens: {
        'xs': '375px',   // 小屏手机
        'sm': '640px',   // 大屏手机/小平板
        'md': '768px',   // 平板
        'lg': '1024px',  // 小桌面
        'xl': '1280px',  // 桌面
        '2xl': '1536px', // 大桌面
      },
      
      // 移动端优化间距
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // 移动端友好的最大宽度
      maxWidth: {
        'xs': '375px',
        'sm': '640px',
        'mobile': '100vw',
      },
      
      // 触摸友好的尺寸
      minHeight: {
        'touch': '44px', // iOS 推荐的最小触摸目标
      },
      minWidth: {
        'touch': '44px',
      }
    },
  },
  plugins: [
    // 添加容器查询支持
    require('@tailwindcss/container-queries'),
  ],
}