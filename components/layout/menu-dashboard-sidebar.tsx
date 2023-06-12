'use client'

import classNames from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menuDashboard } from '@/config/menu-dashboard'

interface MenuDashboardSidebarProps {
  className?: string
}
export const MenuDashboardSidebar = ({ className }: MenuDashboardSidebarProps) => {
  const cx = classNames(className, 'flex flex-col gap-1', 'MenuDashboardSidebar')

  const pathname = usePathname()
  return (
    <div className={cx}>
      {menuDashboard.map((item) => {
        return (
          <Item key={item.href} currentPath={pathname} className="menu-item my-2" href={item.href}>
            <span className="text-lg">{item.label}</span>
          </Item>
        )
      })}
    </div>
  )
}

const Item = ({ children, href, currentPath }: any) => {
  const cx = classNames('menu-item my-2', 'MenuDashboardSidebar', {
    active: currentPath === href,
  })

  return (
    <Link className={cx} href={href}>
      {children}
    </Link>
  )
}
