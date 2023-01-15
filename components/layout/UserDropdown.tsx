import { useState } from 'react'

import { WalletAddress } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'
import { LayoutDashboard, LogOutIcon, PersonStanding, Wallet } from 'lucide-react'
import Link from 'next/link'

import Popover from '@/components/shared/popover'
import { FADE_IN_ANIMATION_SETTINGS } from '@/lib/design'

import ButtonSIWELogout from '../siwe/ButtonSIWELogout'

export default function UserDropdown() {
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <motion.div className="relative inline-block text-left text-neutral-700" {...FADE_IN_ANIMATION_SETTINGS}>
      <Popover
        content={
          <div className="bg-card w-full rounded-md p-2 sm:w-56">
            <Link className="user-dropdown-menu-item" href="/account">
              <PersonStanding className="h-4 w-4" />
              <p className="text-sm">Account</p>
            </Link>
            <Link className="user-dropdown-menu-item " href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </Link>

            <ButtonSIWELogout className="user-dropdown-menu-item">
              <>
                <LogOutIcon className="h-4 w-4" />
                <p className="text-sm">Logout</p>
              </>
            </ButtonSIWELogout>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}>
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="bg-card flex items-center justify-center overflow-hidden rounded-full p-2 px-4 transition-all duration-75 hover:bg-neutral-100 focus:outline-none active:scale-95 ">
          <WalletAddress truncate className="font-raleway font-semibold leading-4 tracking-[0.08em]" />
          <Wallet className="ml-3 h-6 w-6" />
        </button>
      </Popover>
    </motion.div>
  )
}
