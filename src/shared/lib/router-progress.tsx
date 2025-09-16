// src/shared/lib/router-progress.tsx
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import NProgress from "nprogress";

export function RouterProgress() {
  const nav = useNavigation();
  useEffect(() => {
    if (nav.state === "loading" || nav.state === "submitting") NProgress.start();
    else NProgress.done();
  }, [nav.state]);
  return null;
}
