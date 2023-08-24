import { ReactNode } from "react"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { Toaster } from "@/components/ui/toaster"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { DashboardFooter } from "@/components/layout/dashboard-footer"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { MenuDashboardSidebar } from "@/components/layout/menu-dashboard-sidebar"
import { UserDropdown } from "@/components/layout/user-dropdown"
import { IsDarkTheme } from "@/components/shared/is-dark-theme"
import { IsDesktop } from "@/components/shared/is-desktop"
import { IsLightTheme } from "@/components/shared/is-light-theme"
import { IsMobile } from "@/components/shared/is-mobile"
import { LinkComponent } from "@/components/shared/link-component"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-screen flex-col lg:grid lg:grid-cols-12">
        <div className="col-span-12 flex flex-col bg-slate-50 shadow-md dark:bg-slate-800 lg:col-span-2 lg:pb-8">
          <IsMobile>
            <div className="flex p-4">
              <LinkComponent className="flex flex-1 items-center " href="/">
                <IsLightTheme>
                  <Image
                    alt="Logo"
                    height={32}
                    src="/logo-dark.png"
                    width={32}
                  />
                </IsLightTheme>
                <IsDarkTheme>
                  <Image
                    alt="Logo"
                    height={32}
                    src="/logo-white.png"
                    width={32}
                  />
                </IsDarkTheme>
              </LinkComponent>
              <div className="">
                <UserDropdown />
              </div>
            </div>
          </IsMobile>
          <IsDesktop>
            <div className="flex p-4 py-6">
              <LinkComponent className="flex items-center" href="/">
                <IsLightTheme>
                  <Image
                    alt="Logo"
                    height={32}
                    src="/logo-dark.png"
                    width={32}
                  />
                </IsLightTheme>
                <IsDarkTheme>
                  <Image
                    alt="Logo"
                    height={32}
                    src="/logo-white.png"
                    width={32}
                  />
                </IsDarkTheme>
                <h1 className="text-gradient-sand ml-2 text-2xl font-bold">
                  {siteConfig.name}
                </h1>
              </LinkComponent>
            </div>
            <div className="flex-1 px-8 py-5">
              <MenuDashboardSidebar className="mt-4 flex-1" />
            </div>
            <div className="px-8">
              <WalletConnect />
              <LinkComponent
                className="link my-2 mt-8 inline-block text-xs"
                href="/admin"
              >
                Admin
              </LinkComponent>
            </div>
            <hr className="my-4 opacity-25" />
            <DashboardFooter className="px-8 " />
          </IsDesktop>
        </div>
        <div className="relative col-span-12 flex max-h-[100vh] flex-1 flex-col lg:col-span-10">
          <DashboardHeader className="bg-slate-100 py-3 shadow-md dark:bg-slate-700" />
          <main className="w-full flex-1 overflow-auto">{children}</main>
        </div>
      </div>
      <Toaster />
    </>
  )
}
