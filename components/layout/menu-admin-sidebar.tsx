'use client'
import { HTMLAttributes, ReactNode } from 'react'

import classNames from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menuAdmin } from '@/config/menu-admin'

interface MenuAdminSidebarProps {
  className?: string
}
export const MenuAdminSidebar = ({ className }: MenuAdminSidebarProps) => {
  const cx = classNames(className, 'flex flex-col gap-1', 'MenuAdminSidebar')

  const pathname = usePathname()
  return (
    <div className={cx}>
      {menuAdmin.map((item) => {
        return (
          <Item key={item.href} currentPath={pathname} className="menu-item my-2" href={item.href}>
            <span className="text-lg">{item.label}</span>
          </Item>
        )
      })}
    </div>
  )
}

interface ItemProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  href: string
  currentPath: string | null
}

const Item = ({ children, href, currentPath }: ItemProps) => {
  const cx = classNames('menu-item my-2', 'MenuAdminSidebar', {
    active: currentPath === href,
  })

  return (
    <Link className={cx} href={href}>
      {children}
    </Link>
  )
}
