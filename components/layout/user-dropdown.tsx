'use client'
import { motion } from 'framer-motion'
import { BinaryIcon, DatabaseIcon, LayoutDashboard, LogOutIcon } from 'lucide-react'
import Link from 'next/link'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FADE_IN_ANIMATION_SETTINGS } from '@/config/design'
import { IsSignedIn } from '@/integrations/siwe/components/is-signed-in'
import { IsSignedOut } from '@/integrations/siwe/components/is-signed-out'

import { ButtonSIWELogin } from '../../integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '../../integrations/siwe/components/button-siwe-logout'

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
            <IsSignedIn>
              <ButtonSIWELogout className="user-dropdown-menu-item flex">
                <LogOutIcon className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </ButtonSIWELogout>
            </IsSignedIn>
            <IsSignedOut>
              <ButtonSIWELogin className="user-dropdown-menu-item flex">
                <LogOutIcon className="inline-block h-4 w-4" />
                <span className="ml-2 text-sm">Login</span>
              </ButtonSIWELogin>
            </IsSignedOut>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
