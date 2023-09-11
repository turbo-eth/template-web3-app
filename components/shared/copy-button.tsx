"use client"

import { useEffect, useState } from "react"
import { LuCheck, LuCopy } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  children: React.ReactNode
  src?: string
}

export async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  children,
  src,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 3000)
  }, [hasCopied])

  return (
    <Button
      className={cn(
        "relative z-10 flex h-14 items-center gap-x-2 bg-muted/50 py-4 font-mono text-lg text-muted-foreground hover:bg-muted/80 hover:text-accent-foreground",
        className
      )}
      onClick={async () => {
        await copyToClipboard(value)
        setHasCopied(true)
      }}
      {...props}
    >
      {children}
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <LuCheck className="h-4 w-4" />
      ) : (
        <LuCopy className="h-4 w-4" />
      )}
    </Button>
  )
}
