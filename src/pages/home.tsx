// src/pages/home.tsx
import React from "react";
import { http } from "@/shared/api/http";
import { useStore } from "@/shared/store";
import { fromNow, format } from "@/shared/lib/dayjs";
import { useEffect, useState } from "react";


export function Home() {
  const token = useStore((s) => s.token);
  const [serverTime, setServerTime] = useState<string>("");

  useEffect(() => {
    const c = new AbortController();
    http.get<{ now: string }>("/time/now", { signal: c.signal }).then((r) => {
      setServerTime(r.data.now);
    }).catch(() => { });
    return () => c.abort();
  }, []);

  return (
    <div className="p-6">
      <h1>👋 Hello Agent</h1>
      <p>Token: {token ?? "(未登录)"}</p>
      <p>Server now: {format(serverTime)}</p>
      <p>距现在：{fromNow(serverTime)}</p>
    </div>
  );
}
