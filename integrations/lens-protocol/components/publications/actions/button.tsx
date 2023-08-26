import { ReactNode } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

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
  return (
    <button
      className={`btn text-sm text-${color}-500 dark:text-${color}-300`}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        !disabled && execute()
      }}>
      {!hideCount && <span className="mr-1 font-semibold">{count}</span>}
      <span className="relative top-[2px]">
        <Tooltip>
          <TooltipTrigger>{icon}</TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      </span>
    </button>
  )
}
