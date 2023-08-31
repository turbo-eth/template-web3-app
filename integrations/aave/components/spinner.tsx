import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export const Spinner = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <div className="h-8 w-8 animate-spin rounded-full border-y-2 border-blue-500"></div>
    </div>
  )
}
