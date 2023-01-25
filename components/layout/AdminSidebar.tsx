import * as React from 'react'

import classNames from 'clsx'
import { PersonStandingIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import router from 'next/router'

interface AdminSidebarProps {
  className?: string
}
export const AdminSidebar = ({ className }: AdminSidebarProps) => {
  const cx = classNames(className, 'flex flex-col gap-1', 'AdminSidebar')

  const pathname = usePathname()
  return (
    <div className={cx}>
      <Item currentPath={pathname} className="menu-item my-2" href="/admin">
        <PersonStandingIcon width={22} />
        <span className="">Users</span>
      </Item>
    </div>
  )
}

const Item = ({ children, href, currentPath }: any) => {
  const cx = classNames('menu-item my-2', 'AdminSidebar', {
    active: currentPath === href,
  })

  return (
    <Link className={cx} href={href}>
      {children[0]}
      {children[1]}
    </Link>
  )
}

export default AdminSidebar
