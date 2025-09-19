import React from 'react'
import { cn } from "../../../lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const ResponsiveContainer = ({ children, className, size = 'lg' }: ResponsiveContainerProps) => {
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

export default ResponsiveContainer