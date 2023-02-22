'use client'

import classNames from 'clsx'
import Image from 'next/image'

import WalletConnect from '@/components/blockchain/wallet-connect'
import { DashboardHeader } from '@/components/layout/dashboard/dashboard-header'
import MenuDashboardSidebar from '@/components/layout/dashboard/menu-dashboard-sidebar'
import { Footer } from '@/components/layout/general/footer'
import { BranchColorMode } from '@/components/shared/branch-color-mode'
import { LinkComponent } from '@/components/shared/link-component'
import ResponsiveMobileAndDesktop from '@/components/shared/responsive-mobile-and-desktop'
import { siteConfig } from '@/config/site'

export default function DashboardLayout({ children }: any) {
  const classes = classNames('App', 'bg-gradient-dark h-screen flex flex-col grid grid-cols-12')
  return (
    <>
      <div className={classes}>
        <div className="flex flex-col bg-slate-50 shadow-md dark:bg-slate-800 lg:col-span-2">
          <div className=" flex p-4 py-6">
            <ResponsiveMobileAndDesktop>
              <LinkComponent href="/" className="flex flex-1 items-center ">
                <BranchColorMode>
                  <Image alt="Logo" src="/logo-dark.png" width={32} height={32} />
                  <Image alt="Logo" src="/logo-white.png" width={32} height={32} />
                </BranchColorMode>
              </LinkComponent>
              <LinkComponent className="flex items-center" href="/">
                <BranchColorMode>
                  <Image alt="Logo" src="/logo-dark.png" width={32} height={32} />
                  <Image alt="Logo" src="/logo-white.png" width={32} height={32} />
                </BranchColorMode>
                <h1 className="text-gradient-sand ml-2 text-2xl font-bold">{siteConfig.name}</h1>
              </LinkComponent>
            </ResponsiveMobileAndDesktop>
          </div>
          <div className="flex-1 px-8 py-5">
            <MenuDashboardSidebar className="mt-4 flex-1" />
          </div>
          <div className="p-8">
            <WalletConnect />
          </div>
        </div>
        <div className="relative flex max-h-[100vh] flex-1 flex-col lg:col-span-10">
          <DashboardHeader className="bg-slate-100 py-3 shadow-md dark:bg-slate-700" />
          <main className="w-full flex-1 overflow-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}
