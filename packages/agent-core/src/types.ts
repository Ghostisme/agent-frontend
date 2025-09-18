export type MessageRole = "user" | "assistant" | "system" | "tool";

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt?: number;
  toolName?: string;
  meta?: Record<string, any>;
};

export type ProviderType = "openai" | "dify" | "fastgpt" | "custom";

export type ChatSchema = {
  layout?: { sidebar?: boolean; inspector?: boolean; maxWidth?: "lg" | "xl" | "full" };
  composer: {
    placeholder?: string;
    shortcuts?: { sendOnEnter?: boolean; newLineOnShiftEnter?: boolean };
    tools?: Array<{ id: string; label: string; icon?: string }>;
  };
  messages?: {
    showAvatars?: boolean;
    showTimestamps?: boolean;
    inlineActions?: Array<"copy" | "feedback" | "regenerate" | "cite-toggle">;
  };
  threads?: { enable?: boolean; pinned?: boolean; searchable?: boolean };
  quickPrompts?: Array<{ id: string; text: string }>;
  provider: {
    type: ProviderType;
    options?: Record<string, any>;
  };
};

export type Provider = {
  send(messages: Message[], signal?: AbortSignal): Promise<string>;
};

export type UseChatState = {
  messages: Message[];
  isLoading: boolean;
};

export type UseChatApi = {
  send: (input: string) => Promise<void>;
  stop: () => void;
  clear: () => void;
  regenerateLast: () => Promise<void>;
};

export type UseChatReturn = UseChatState & UseChatApi;