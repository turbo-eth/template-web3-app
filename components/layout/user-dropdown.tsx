import { motion } from 'framer-motion'
import { BinaryIcon, DatabaseIcon, LayoutDashboard, LogOutIcon, Wallet } from 'lucide-react'
import Link from 'next/link'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FADE_IN_ANIMATION_SETTINGS } from '@/config/design'

import { ButtonSIWELogin } from '../../integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '../../integrations/siwe/components/button-siwe-logout'
import { BranchIsAuthenticated } from '../shared/branch-is-authenticated'

export function UserDropdown() {
  return (
    <motion.div className="relative inline-block text-left text-neutral-700" {...FADE_IN_ANIMATION_SETTINGS}>
      <Popover>
        <PopoverTrigger>
          <button className="bg-card flex items-center justify-center overflow-hidden rounded-md p-2 px-4 transition-all duration-75 hover:bg-neutral-100 focus:outline-none active:scale-95 ">
            Menu
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full rounded-md p-2 ">
            <Link className="user-dropdown-menu-item" href="/">
              <BinaryIcon className="h-4 w-4" />
              <p className="text-sm">Site</p>
            </Link>
            <Link className="user-dropdown-menu-item " href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </Link>
            <Link className="user-dropdown-menu-item " href="/admin">
              <DatabaseIcon className="h-4 w-4" />
              <p className="text-sm">Admin</p>
            </Link>
            <BranchIsAuthenticated>
              <ButtonSIWELogout className="user-dropdown-menu-item flex">
                <LogOutIcon className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </ButtonSIWELogout>
              <ButtonSIWELogin className="user-dropdown-menu-item flex">
                <LogOutIcon className="inline-block h-4 w-4" />
                <span className="ml-2 text-sm">Login</span>
              </ButtonSIWELogin>
            </BranchIsAuthenticated>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
