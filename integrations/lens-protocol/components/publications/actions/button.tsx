import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const ActionButton = ({
  color,
  execute,
  name,
  hideCount,
  count,
  disabled,
  icon,
}: {
  color: string
  execute: () => void
  name: string
  hideCount: boolean
  count: number
  disabled: boolean
  icon: ReactNode
}) => {
  const btnColor = `text-${color}-500 dark:text-${color}-300 hover:text-${color}-600 hover:dark:text-${color}-200`
  return (
    <Button
      variant="outline"
      className={btnColor}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        !disabled && execute()
      }}
    >
      {!hideCount && <span className="mr-1 font-semibold">{count}</span>}
      <span className="relative top-[2px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{icon}</TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </Button>
  )
}
