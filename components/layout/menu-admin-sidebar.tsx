'use client'
import { HTMLAttributes } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menuAdmin } from '@/config/menu-admin'
import { cn } from '@/lib/utils'

export const MenuAdminSidebar = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const cx = cn(className, 'flex flex-col gap-1')

  const pathname = usePathname()
  return (
    <div className={cx} {...props}>
      {menuAdmin.map((item) => {
        return (
          <Item key={item.href} className="menu-item my-2" currentPath={pathname} href={item.href}>
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

const Item = ({ children, href, currentPath }: ItemProps) => {
  const cx = cn('menu-item my-2', {
    active: currentPath === href,
  })

  return (
    <Link className={cx} href={href}>
      {children}
    </Link>
  )
}
