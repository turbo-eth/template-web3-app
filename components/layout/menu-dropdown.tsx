import * as React from 'react'

import classNames from 'clsx'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { menuMain } from '@/config/menu-main'

import { LinkComponent } from '../shared/LinkComponent'

interface MenuDropdownProps {
  className?: string
  children: React.ReactNode
}

const MenuItem = (props: any) => {
  return (
    <DropdownMenuItem>
      <LinkComponent {...props} />
    </DropdownMenuItem>
  )
}

export const MenuDropdown = ({ className, children }: MenuDropdownProps) => {
  const classes = classNames(className, 'MenuDropdown')
  return (
    <div className={classes}>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {menuMain.map((item, index) => {
            return <MenuItem key={index} {...item} />
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MenuDropdown
