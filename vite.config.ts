import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // 让 Vite 按 tsconfig 的 paths 解析
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 别名必须是绝对路径
    },
  },
});