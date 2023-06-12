import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as AvatarPrimivite from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

const Avatar = forwardRef<ElementRef<typeof AvatarPrimivite.Root>, ComponentPropsWithoutRef<typeof AvatarPrimivite.Root>>(
  ({ className, ...props }, ref) => (
    <AvatarPrimivite.Root ref={ref} className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props} />
  )
)
Avatar.displayName = AvatarPrimivite.Root.displayName

const AvatarImage = forwardRef<ElementRef<typeof AvatarPrimivite.Image>, ComponentPropsWithoutRef<typeof AvatarPrimivite.Image>>(
  ({ className, ...props }, ref) => <AvatarPrimivite.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
)
AvatarImage.displayName = AvatarPrimivite.Image.displayName

const AvatarFallback = forwardRef<ElementRef<typeof AvatarPrimivite.Fallback>, ComponentPropsWithoutRef<typeof AvatarPrimivite.Fallback>>(
  ({ className, ...props }, ref) => (
    <AvatarPrimivite.Fallback
      ref={ref}
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700', className)}
      {...props}
    />
  )
)
AvatarFallback.displayName = AvatarPrimivite.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
