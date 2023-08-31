import Link from "next/link"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"

import { menuAdmin } from "@/config/menu-admin"
import { menuDashboard } from "@/config/menu-dashboard"
import { siteConfig } from "@/config/site"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { SiteHeader } from "@/components/layout/site-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 justify-between overflow-y-auto border-r md:sticky md:flex md:flex-col">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <h3 className="text-lg font-normal">User</h3>
            <SidebarNav items={menuDashboard} />
            <hr className="my-6 border-t border-muted" />
            <h3 className="text-lg font-normal">Admin</h3>
            <SidebarNav items={menuAdmin} />
          </ScrollArea>
          <footer className="fixed bottom-6 flex flex-col border-t pr-2 pt-4">
            <h3 className="text-sm font-semibold">{siteConfig.title}</h3>
            <a
              href="https://districtlabs.com"
              target="_blank"
              rel="noreferrer"
              className="w-fit py-2 text-xs text-primary underline-offset-4 hover:underline"
            >
              Built by District Labs
            </a>
            <div className="mt-2 flex items-center space-x-2">
              <Link href={siteConfig.links.github}>
                <FaGithub />
              </Link>
              <Link href={siteConfig.links.twitter}>
                <FaTwitter />
              </Link>
              <Link href={siteConfig.links.discord}>
                <FaDiscord />
              </Link>
            </div>
          </footer>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      <div className="fixed bottom-6 right-6">
        <WalletConnect />
      </div>
    </div>
  )
}
