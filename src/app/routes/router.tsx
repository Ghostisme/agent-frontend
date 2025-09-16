// src/app/routes/router.tsx（示意）
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterProgress } from "@/shared/lib/router-progress";

const router = createBrowserRouter([
  { path: "/", async lazy() { const { Home } = await import("@/pages/home"); return { Component: Home }; } },
]);
export function AppRouter() {
  return (
    <>
      <RouterProgress />
      <RouterProvider router={router} />
    </>
  );
}
