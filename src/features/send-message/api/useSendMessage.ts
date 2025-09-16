// src/features/send-message/api/useSendMessage.ts
import { useMutation } from "@tanstack/react-query";
import { http } from "@/shared/api/http"; // axios/fetch 封装

export function useSendMessage() {
  return useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (payload: { conversationId: string; text: string }) =>
      http.post(`/conversations/${payload.conversationId}/messages`, payload),
  });
}
