import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

const Separator = forwardRef<ElementRef<typeof SeparatorPrimitive.Root>, ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      className={cn('bg-slate-200 dark:bg-slate-700', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
