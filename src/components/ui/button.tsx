import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const getVariantClass = () => {
      switch (variant) {
        case "gradient":
          return "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        case "destructive":
          return "bg-red-500 text-white hover:bg-red-600"
        case "outline":
          return "border border-gray-300 bg-transparent hover:bg-gray-50"
        case "secondary":
          return "bg-gray-100 text-gray-900 hover:bg-gray-200"
        case "ghost":
          return "hover:bg-gray-100 hover:text-gray-900"
        case "link":
          return "text-blue-600 underline-offset-4 hover:underline"
        default:
          return "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      }
    }

    const getSizeClass = () => {
      switch (size) {
        case "sm":
          return "h-9 rounded-lg px-3"
        case "lg":
          return "h-12 rounded-xl px-8"
        case "icon":
          return "h-10 w-10"
        default:
          return "h-10 px-4 py-2"
      }
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          getVariantClass(),
          getSizeClass(),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }