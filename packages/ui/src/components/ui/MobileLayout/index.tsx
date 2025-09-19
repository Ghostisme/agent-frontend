import React from 'react'
import { cn } from "../../../lib/utils"

interface MobileLayoutProps {
  children: React.ReactNode
  className?: string
  showSafeArea?: boolean
}

const MobileLayout = ({ children, className, showSafeArea = true }: MobileLayoutProps) => {
  return (
    <div
      className={cn(
        "min-h-full bg-background text-foreground",
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

export default MobileLayout