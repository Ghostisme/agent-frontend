import type { Message, Provider } from "../types";

type OpenAIOptions = {
  baseUrl?: string;            // OpenAI 兼容的 /v1/chat/completions
  apiKey?: string;             // 建议走代理后端，前端不直接暴露 Key
  model?: string;
  temperature?: number;
  headers?: Record<string, string>;
};

export function createOpenAIProvider(options: OpenAIOptions = {}): Provider {
  const {
    baseUrl = "https://api.openai.com/v1/chat/completions",
    apiKey,
    model = "gpt-4o-mini",
    temperature = 0.7,
    headers = {}
  } = options;

  return {
    async send(messages: Message[], signal?: AbortSignal): Promise<string> {
      const payload = {
        model,
        temperature,
        stream: false,
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      };

      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "Authorization": `Bearer ${apiKey}` } : {}),
          ...headers
        },
        body: JSON.stringify(payload),
        signal
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Provider error ${res.status}: ${text}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content ?? "";
      return String(content);
    }
  };
}