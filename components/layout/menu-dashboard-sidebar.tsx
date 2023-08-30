"use client"

import { HTMLAttributes } from "react"
import { usePathname } from "next/navigation"

import { menuDashboard } from "@/config/menu-dashboard"
import { cn } from "@/lib/utils"

import { LinkComponent } from "../shared/link-component"

export const MenuDashboardSidebar = ({
  className,
}: HTMLAttributes<HTMLElement>) => {
  const cx = cn(className, "flex flex-col gap-1")

  const pathname = usePathname()
  return (
    <div className={cx}>
      {menuDashboard.map((item) => {
        return (
          <Item
            key={item.href}
            className="menu-item my-2"
            currentPath={pathname}
            href={item.href}
          >
            <span className="text-lg">{item.label}</span>
          </Item>
        )
      })}
    </div>
  )
}

interface ItemProps extends HTMLAttributes<HTMLElement> {
  href: string
  currentPath: string | null
}

const Item = ({ children, href, currentPath, ...props }: ItemProps) => {
  const cx = cn("menu-item my-2", {
    active: currentPath === href,
  })

  return (
    <LinkComponent className={cx} href={href} {...props}>
      {children}
    </LinkComponent>
  )
}
