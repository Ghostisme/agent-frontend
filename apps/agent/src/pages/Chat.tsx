import { ChatLayout } from "@nexus/ui/components/agent-chat/chat-layout";
import { useChat } from "@nexus/agent-core";
import schema from "../chat.schema.json";
import type { ChatSchema } from "@nexus/agent-core";

export default function Chat() {
  const chat = useChat({ schema: schema as ChatSchema });
  return <ChatLayout schema={schema as ChatSchema} chat={chat} />;
}