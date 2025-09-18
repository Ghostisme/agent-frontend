import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const responsiveButtonVariants = cva(
  // 基础样式 - 移动优先
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        // 移动端友好的尺寸
        sm: "h-10 px-3 py-2 text-xs sm:h-9 sm:px-2.5 sm:text-sm", 
        default: "h-12 px-4 py-2 sm:h-10 sm:px-4 sm:py-2",
        lg: "h-14 px-6 py-3 text-base sm:h-11 sm:px-8 sm:text-sm",
        // 触摸友好的图标按钮
        icon: "h-12 w-12 sm:h-10 sm:w-10",
      },
      responsive: {
        true: "w-full sm:w-auto", // 移动端全宽，桌面端自适应
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      responsive: false,
    },
  }
)

export interface ResponsiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof responsiveButtonVariants> {}

const ResponsiveButton = React.forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  ({ className, variant, size, responsive, ...props }, ref) => {
    return (
      <button
        className={cn(responsiveButtonVariants({ variant, size, responsive, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ResponsiveButton.displayName = "ResponsiveButton"

export { ResponsiveButton, responsiveButtonVariants }