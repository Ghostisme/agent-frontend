// src/features/send-message/ui/SendMessageForm.tsx
import React from "react";
import { useSendMessage } from "../api/useSendMessage";

export function SendMessageForm({ conversationId }: { conversationId: string }) {
  const { mutate, isPending } = useSendMessage();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const text = new FormData(e.currentTarget).get("text") as string;
        mutate({ conversationId, text });
        e.currentTarget.reset();
      }}
    >
      <input name="text" placeholder="Say something…" />
      <button disabled={isPending}>Send</button>
    </form>
  );
}
