import React from "react"
import { Button } from "../ui/button";

export function ThreadList({ onNewThread }: { onNewThread: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b font-semibold">会话</div>
      <div className="p-3 space-y-2">
        <Button className="w-full" onClick={onNewThread}>新建对话</Button>
      </div>
      <div className="px-3 text-xs text-muted-foreground mt-auto mb-3">
        这里可扩展：会话列表 / 搜索 / 置顶
      </div>
    </div>
  );
}