import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../ui/Button/index";

type Tool = { id: string; label: string; icon?: string };

export function Composer(props: {
  isLoading: boolean;
  placeholder?: string;
  tools: Tool[];
  onSend: (text: string) => Promise<void> | void;
  onStop?: () => void;
}) {
  const { isLoading, placeholder, tools, onSend, onStop } = props;
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const doSend = useCallback(async () => {
    const v = value.trim();
    if (!v) return;
    setValue("");
    await onSend(v);
    ref.current?.focus();
  }, [onSend, value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 240) + "px";
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        {tools?.map(t => (
          <Button key={t.id} type='primary' onClick={() => { /* 预留工具执行 */ }}>
            {t.label}
          </Button>
        ))}
      </div>
      <div className="flex items-end gap-2">
        <textarea
          ref={ref}
          className="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm focus:outline-none"
          placeholder={placeholder ?? "输入消息…"}
          rows={1}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!isLoading) doSend();
            }
          }}
        />
        {!isLoading ? (
          <Button type="primary" onClick={() => doSend()} disabled={!value.trim()}>
            发送
          </Button>
        ) : (
          <Button type='default' variant="outline" onClick={() => onStop?.()}>
            停止
          </Button>
        )}
      </div>
    </div>
  );
}