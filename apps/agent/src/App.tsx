// import { Button } from "@nexus/ui/components/button"
// import { ResponsiveButton } from "@nexus/ui/components/responsive-button"
import { ResponsiveContainer, MobileLayout } from "@nexus/ui/components/mobile-layout"
import { ThemeProvider } from "./components/theme-provider"
import { ChatLayout } from "@nexus/ui/components/agent-chat/chat-layout"
import { useChat } from "@nexus/agent-core"
import schema from "./chat.schema.json"
import type { ChatSchema } from "@nexus/agent-core"

function App() {
  const chat = useChat({ schema: schema as ChatSchema })
  return (
    <ThemeProvider defaultTheme="light">
      <ChatLayout schema={schema as ChatSchema} chat={chat} />
      <MobileLayout className="hidden">
      
        <ResponsiveContainer size="lg" className="hidden">
          <div className="py-8 space-y-6 hidden">
            {/* 标题区域 - 响应式字体大小 */}
            {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
              天蓝色系响应式应用
            </h1> */}
            
            {/* 按钮组 - 移动端垂直排列，桌面端水平排列 */}
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" className="flex-1 sm:flex-none">
                主要操作
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none">
                次要操作
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                其他操作
              </Button>
              <ResponsiveButton variant="default" className="flex-1 sm:flex-none">
                移动端按钮
              </ResponsiveButton>
            </div> */}

            {/* 卡片网格 - 响应式布局 */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 border border-primary/20 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                  <h3 className="font-semibold text-primary">卡片标题 {i + 1}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    这是一个响应式卡片组件的示例内容
                  </p>
                </div>
              ))}
            </div> */}
            
          </div>
        </ResponsiveContainer>
      </MobileLayout>
    </ThemeProvider>
  )
}

export default App
