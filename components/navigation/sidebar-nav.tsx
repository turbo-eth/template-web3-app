"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    label: string
    href?: string
  }[]
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {items.map((item, index) => {
        return item.href ? (
          <Link aria-label={item.label} key={index} href={item.href}>
            <span
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                pathname === item.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <span>{item.label}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.label}
          </span>
        )
      })}
    </div>
  )
}
