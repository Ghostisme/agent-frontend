// src/shared/store/index.ts
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// --- 定义切片 types
type SessionSlice = {
  token?: string;
  setToken: (t?: string) => void;
};
type UISettingsSlice = {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
};

// --- 切片实现（可拆文件）
const createSessionSlice = (set): SessionSlice => ({
  token: undefined,
  setToken: (t) => set((s) => { s.token = t; }),
});
const createUISettingsSlice = (set): UISettingsSlice => ({
  theme: "light",
  setTheme: (t) => set((s) => { s.theme = t; }),
});

// --- 组合根 store
type RootStore = SessionSlice & UISettingsSlice;

export const useStore = create<RootStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createSessionSlice(set, get),
        ...createUISettingsSlice(set, get),
      })),
      {
        name: "app-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (s) => ({ token: s.token, theme: s.theme }), // 按需持久化
      }
    )
  )
);
