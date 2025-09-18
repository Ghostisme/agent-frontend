import React from "react"
import type { Message } from "@nexus/agent-core";
import { cn } from "../../lib/utils";

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="p-4 space-y-3">
      {messages.map((m) => {
        const isUser = m.role === "user";
        const bubbleCls = isUser
          ? "bg-primary text-primary-foreground"
          : m.meta?.error ? "bg-destructive/10 text-destructive" : "bg-muted";
        return (
          <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] rounded-lg px-3 py-2 whitespace-pre-wrap break-words", bubbleCls)}>
              {m.content}
            </div>
          </div>
        );
      })}
      {messages.length === 0 ? (
        <div className="text-sm text-muted-foreground px-2">开始你的第一条对话吧。</div>
      ) : null}
    </div>
  );
}