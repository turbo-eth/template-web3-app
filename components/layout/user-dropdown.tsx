"use client"

import { motion } from "framer-motion"
import {
  LuBinary,
  LuDatabase,
  LuLayoutDashboard,
  LuLogOut,
} from "react-icons/lu"

import { FADE_IN_ANIMATION_SETTINGS } from "@/config/design"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

import { ButtonSIWELogin } from "../../integrations/siwe/components/button-siwe-login"
import { ButtonSIWELogout } from "../../integrations/siwe/components/button-siwe-logout"
import { LinkComponent } from "../shared/link-component"

export function UserDropdown() {
  return (
    <motion.div
      className="relative inline-block text-left text-neutral-700"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <Popover>
        <PopoverTrigger>
          <button className="bg-card flex items-center justify-center overflow-hidden rounded-md p-2 px-4 transition-all duration-75 hover:bg-neutral-100 focus:outline-none active:scale-95 ">
            Menu
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full rounded-md p-2 ">
            <LinkComponent className="user-dropdown-menu-item" href="/">
              <LuBinary className="h-4 w-4" />
              <p className="text-sm">Site</p>
            </LinkComponent>
            <LinkComponent
              className="user-dropdown-menu-item "
              href="/dashboard"
            >
              <LuLayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </LinkComponent>
            <LinkComponent className="user-dropdown-menu-item " href="/admin">
              <LuDatabase className="h-4 w-4" />
              <p className="text-sm">Admin</p>
            </LinkComponent>
            <IsSignedIn>
              <ButtonSIWELogout className="user-dropdown-menu-item flex">
                <LuLogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </ButtonSIWELogout>
            </IsSignedIn>
            <IsSignedOut>
              <ButtonSIWELogin className="user-dropdown-menu-item flex">
                <LuLogOut className="inline-block h-4 w-4" />
                <span className="ml-2 text-sm">Login</span>
              </ButtonSIWELogin>
            </IsSignedOut>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
