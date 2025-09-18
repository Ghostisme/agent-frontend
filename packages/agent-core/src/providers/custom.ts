import type { Message, Provider } from "../types";

/**
 * 自定义/代理后端 Provider
 * options: { endpoint: string, headers?: Record<string,string> }
 * 后端自行兼容 { messages } -> { content } 的简单协议
 */
export function createCustomProvider(options: { endpoint: string; headers?: Record<string, string> }): Provider {
  const { endpoint, headers = {} } = options || ({} as any);

  return {
    async send(messages: Message[], signal?: AbortSignal): Promise<string> {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify({ messages }),
        signal
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Provider error ${res.status}: ${text}`);
      }

      const data = await res.json();
      return String(data?.content ?? "");
    }
  };
}