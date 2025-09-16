// src/shared/api/http.ts
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { API_BASE_URL } from "@/shared/config";

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

// 简单的并发计数，优雅结束进度条
let pendingCount = 0;
const start = () => { if (pendingCount++ === 0) NProgress.start(); };
const done = () => { if (pendingCount > 0 && --pendingCount === 0) NProgress.done(); };

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: 15000,            // 超时也会走错误分支
  withCredentials: true,
});

// 请求拦截：加 token / traceId / locale 等
http.interceptors.request.use((config) => {
  start();
  // 示例：从本地存储取 token
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // 支持 AbortController 传入 signal（axios 原生支持）
  return config;
});

// 响应拦截：统一错误规范化
http.interceptors.response.use(
  (res) => { done(); return res; },
  (error) => {
    done();
    // axios 错误对象结构：error.response / error.request / error.message
    // 这里可按业务映射 toast / 上报等
    return Promise.reject(error);
  }
);

const c = new AbortController();
http.get("/messages", { signal: c.signal }).catch(() => { });
// unmount 或路由跳转时：
c.abort();
