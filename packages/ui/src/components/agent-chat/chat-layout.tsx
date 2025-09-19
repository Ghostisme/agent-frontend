import React from "react"
import type { ChatSchema } from "@nexus/agent-core";
import type { UseChatReturn } from "@nexus/agent-core";
import { MessageList } from "./message-list";
import { Composer } from "./composer";
import { ThreadList } from "./thread-list";
import MobileLayout from "../ui/MobileLayout";
import ResponsiveContainer from "../ui/ResponsiveContainer";

type Props = {
  schema: ChatSchema;
  chat: UseChatReturn;
};

export function ChatLayout({ schema, chat }: Props) {
  const showSidebar = schema.layout?.sidebar ?? true;
  const maxW = schema.layout?.maxWidth === "full" ? "max-w-full" :
               schema.layout?.maxWidth === "xl" ? "max-w-6xl" : "max-w-4xl";

  return (
    <MobileLayout>
      <ResponsiveContainer size="lg">
        <div className={`mx-auto ${maxW} grid gap-4`} style={{ gridTemplateColumns: showSidebar ? "280px 1fr" : "1fr" }}>
          {showSidebar ? (
            <aside className="hidden md:block border rounded-lg overflow-hidden">
              <ThreadList onNewThread={chat.clear} />
            </aside>
          ) : null}
          <section className="border rounded-lg flex flex-col min-h-[70vh]">
            <div className="border-b px-4 py-3 font-semibold">对话</div>
            <div className="flex-1 overflow-auto">
              <MessageList messages={chat.messages} />
            </div>
            <div className="border-t p-3">
              <Composer
                isLoading={chat.isLoading}
                placeholder={schema.composer?.placeholder ?? "输入消息…"}
                tools={schema.composer?.tools ?? []}
                onSend={chat.send}
                onStop={chat.stop}
              />
            </div>
          </section>
        </div>
      </ResponsiveContainer>
    </MobileLayout>
  );
}