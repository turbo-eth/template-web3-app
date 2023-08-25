import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { LuChevronDown } from 'react-icons/lu'

import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = forwardRef<ElementRef<typeof AccordionPrimitive.Item>, ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={cn('border-b border-b-slate-200 dark:border-b-slate-700', className)} {...props} />
  )
)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = forwardRef<ElementRef<typeof AccordionPrimitive.Trigger>, ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}>
        {children}
        <LuChevronDown className="h-4 w-4 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = forwardRef<ElementRef<typeof AccordionPrimitive.Content>, ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'overflow-hidden text-sm transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
        className
      )}
      {...props}>
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
)
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
