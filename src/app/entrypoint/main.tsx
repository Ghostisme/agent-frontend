// src/app/entrypoint/main.tsx
import React, { StrictMode } from "react";
// import ReactDOM from "react-dom/client";
// import { AppRouter } from "@/app/routes/router";
// import "@/index.css"; // 记得引入 nprogress 样式：见 http.ts
// ReactDOM.createRoot(document.getElementById("root")!).render(<AppRouter />);

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)