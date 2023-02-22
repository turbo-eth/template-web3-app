import { useState } from 'react'

import { WalletAddress } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'
import { BinaryIcon, DatabaseIcon, LayoutDashboard, LogOutIcon, Wallet } from 'lucide-react'
import Link from 'next/link'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/ui/popover'
import { FADE_IN_ANIMATION_SETTINGS } from '@/config/design'

import BranchIsAuthenticated from '../shared/branch-is-authenticated'
import ButtonSIWELogin from '../siwe/button-siwe-login'
import ButtonSIWELogout from '../siwe/button-siwe-logout'

export default function UserDropdown() {
  return (
    <motion.div className="relative inline-block text-left text-neutral-700" {...FADE_IN_ANIMATION_SETTINGS}>
      <Popover>
        <PopoverTrigger>
          <button className="bg-card flex items-center justify-center overflow-hidden rounded-md p-2 px-4 transition-all duration-75 hover:bg-neutral-100 focus:outline-none active:scale-95 ">
            <Wallet className="h-6 w-6" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full rounded-md p-2">
            <Link className="user-dropdown-menu-item" href="/application">
              <BinaryIcon className="h-4 w-4" />
              <p className="text-sm">Application</p>
            </Link>
            <Link className="user-dropdown-menu-item " href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Blockchain</p>
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
