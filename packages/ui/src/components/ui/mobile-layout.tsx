import React from "react"
import { cn } from "../../lib/utils"

interface MobileLayoutProps {
  children: React.ReactNode
  className?: string
  showSafeArea?: boolean
}

export function MobileLayout({ children, className, showSafeArea = true }: MobileLayoutProps) {
  return (
    <div 
      className={cn(
        "min-h-screen bg-background text-foreground",
        // 安全区域适配
        showSafeArea && [
          "pt-safe-top pb-safe-bottom pl-safe-left pr-safe-right",
          "supports-[padding:max(0px)]:pt-[max(1rem,env(safe-area-inset-top))]",
          "supports-[padding:max(0px)]:pb-[max(1rem,env(safe-area-inset-bottom))]"
        ],
        className
      )}
    >
      {children}
    </div>
  )
}

// 响应式容器组件
interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function ResponsiveContainer({ 
  children, 
  className, 
  size = 'lg' 
}: ResponsiveContainerProps) {
  return (
    <div 
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        {
          'max-w-sm': size === 'sm',
          'max-w-md': size === 'md', 
          'max-w-4xl': size === 'lg',
          'max-w-7xl': size === 'xl',
          'max-w-none': size === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  )
}