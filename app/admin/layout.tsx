"use client"

import Image from "next/image"
import classNames from "clsx"

import { siteConfig } from "@/config/site"
import { DashboardFooter } from "@/components/layout/dashboard-footer"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { MenuAdminSidebar } from "@/components/layout/menu-admin-sidebar"
import { UserDropdown } from "@/components/layout/user-dropdown"
import { BranchColorMode } from "@/components/shared/branch-color-mode"
import { LinkComponent } from "@/components/shared/link-component"
import { ResponsiveMobileAndDesktop } from "@/components/shared/responsive-mobile-and-desktop"
import { WalletConnect } from "@/integrations/rainbow-kit/wallet-connect"

export default function AdminLayout({ children }: any) {
  const classes = classNames(
    "AdminLayout",
    "bg-gradient-dark h-screen lg:grid lg:grid-cols-12"
  )
  return (
    <>
      <div className={classes}>
        <div className="col-span-12 flex flex-col bg-slate-50 shadow-md dark:bg-slate-800 lg:col-span-2 lg:pb-8">
          <ResponsiveMobileAndDesktop>
            <>
              <div className="flex p-4">
                <LinkComponent href="/" className="flex flex-1 items-center ">
                  <BranchColorMode>
                    <Image
                      alt="Logo"
                      src="/logo-dark.png"
                      width={32}
                      height={32}
                    />
                    <Image
                      alt="Logo"
                      src="/logo-white.png"
                      width={32}
                      height={32}
                    />
                  </BranchColorMode>
                </LinkComponent>
                <div className="">
                  <UserDropdown />
                </div>
              </div>
            </>
            <>
              <div className="flex p-4 py-6">
                <LinkComponent className="flex items-center" href="/">
                  <BranchColorMode>
                    <Image
                      alt="Logo"
                      src="/logo-dark.png"
                      width={32}
                      height={32}
                    />
                    <Image
                      alt="Logo"
                      src="/logo-white.png"
                      width={32}
                      height={32}
                    />
                  </BranchColorMode>
                  <h1 className="text-gradient-sand ml-2 text-2xl font-bold">
                    {siteConfig.name}
                  </h1>
                </LinkComponent>
              </div>
              <div className="flex-1 px-8 py-5">
                <MenuAdminSidebar className="mt-4 flex-1" />
              </div>
              <div className="px-8">
                <WalletConnect />
                <LinkComponent
                  href="/dashboard"
                  className="link my-2 mt-8 inline-block text-xs"
                >
                  Dashboard
                </LinkComponent>
              </div>
              <hr className="my-4 opacity-25" />
              <DashboardFooter className="px-8 " />
            </>
          </ResponsiveMobileAndDesktop>
        </div>
        <div className="relative col-span-12 flex max-h-[100vh] flex-1 flex-col lg:col-span-10">
          <DashboardHeader className="bg-slate-100 py-3 shadow-md dark:bg-slate-700" />
          <main className="w-full flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  )
}
