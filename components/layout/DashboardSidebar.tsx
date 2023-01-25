'use client'
import * as React from 'react'

import classNames from 'clsx'
import { LayoutDashboardIcon, NetworkIcon, Wallet } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardSidebarProps {
  className?: string
}
export const DashboardSidebar = ({ className }: DashboardSidebarProps) => {
  const cx = classNames(className, 'flex flex-col gap-1', 'DashboardSidebar')

  const pathname = usePathname()
  return (
    <div className={cx}>
      <Item currentPath={pathname} className="menu-item my-2" href="/dashboard">
        <LayoutDashboardIcon width={22} />
        <span className="">Dashboard</span>
      </Item>
      <Item currentPath={pathname} className="menu-item my-2" href="/dashboard/account">
        <Wallet width={22} />
        <span className="">Account</span>
      </Item>
      <Item currentPath={pathname} className="menu-item my-2" href="/dashboard/transactions">
        <NetworkIcon width={22} />
        <span className="">Transactions</span>
      </Item>
    </div>
  )
}

const Item = ({ children, href, currentPath }: any) => {
  const cx = classNames('menu-item my-2', 'DashboardSidebar', {
    active: currentPath === href,
  })

  return (
    <Link className={cx} href={href}>
      {children[0]}
      {children[1]}
    </Link>
  )
}

export default DashboardSidebar
