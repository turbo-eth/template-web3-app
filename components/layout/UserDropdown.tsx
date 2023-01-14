import { useState } from 'react'

import { WalletAddress } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'
import { LayoutDashboard, LogOutIcon, PersonStanding, Wallet } from 'lucide-react'
import Link from 'next/link'

import Popover from '@/components/shared/popover'
import { FADE_IN_ANIMATION_SETTINGS } from '@/lib/design'

import ButtonSIWELogout from '../siwe-update/ButtonSIWELogout'

export default function UserDropdown() {
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <motion.div className="relative inline-block text-left text-neutral-700" {...FADE_IN_ANIMATION_SETTINGS}>
      <Popover
        content={
          <div className="bg-card w-full rounded-md p-2 sm:w-56">
            <Link
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/account">
              <PersonStanding className="h-4 w-4" />
              <p className="text-sm">Account</p>
            </Link>
            <Link
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </Link>

            <ButtonSIWELogout className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
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
          className="bg-card flex items-center justify-center overflow-hidden rounded-full border border-gray-300 p-2 px-4 transition-all duration-75 hover:bg-neutral-100 focus:outline-none active:scale-95 dark:border-neutral-600">
          <WalletAddress truncate className="font-raleway font-semibold leading-4  tracking-[0.08em]" />
          <Wallet className="ml-3 h-6 w-6" />
        </button>
      </Popover>
    </motion.div>
  )
}
