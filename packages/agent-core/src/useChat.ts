import { useCallback, useMemo, useRef, useState } from "react";
import type { ChatSchema, Message, UseChatReturn } from "./types";
import { createOpenAIProvider } from "./providers/openai";
import { createCustomProvider } from "./providers/custom";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function useChat({ schema }: { schema: ChatSchema }): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const lastUserMsgRef = useRef<string | null>(null);

  const provider = useMemo(() => {
    switch (schema.provider.type) {
      case "openai":
      case "dify":
      case "fastgpt":
        // 大多数都支持 openai 兼容接口
        return createOpenAIProvider(schema.provider.options);
      case "custom":
      default:
        return createCustomProvider(schema.provider.options as any);
    }
  }, [schema.provider]);

  const send = useCallback(async (input: string) => {
    if (!input?.trim() || isLoading) return;

    const userMsg: Message = { id: uid(), role: "user", content: input, createdAt: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    lastUserMsgRef.current = input;
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const content = await provider.send([...messages, userMsg], controller.signal);
      const aiMsg: Message = { id: uid(), role: "assistant", content, createdAt: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e: any) {
      const errMsg: Message = {
        id: uid(),
        role: "assistant",
        content: `抱歉，请求失败：${e?.message ?? "Unknown error"}`,
        createdAt: Date.now(),
        meta: { error: true }
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [isLoading, messages, provider]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
    setMessages([]);
    lastUserMsgRef.current = null;
  }, []);

  const regenerateLast = useCallback(async () => {
    const last = lastUserMsgRef.current;
    if (!last) return;
    await send(last);
  }, [send]);

  return { messages, isLoading, send, stop, clear, regenerateLast };
}