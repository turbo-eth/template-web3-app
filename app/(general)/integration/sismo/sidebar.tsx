"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { turboIntegrations } from "@/data/turbo-integrations"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LinkComponent } from "@/components/shared/link-component"
import { ArweaveAccountPreview } from "@/integrations/arweave/components/arweave-account/sidebar-preview"

export const SideBar = () => {
  const pathname = usePathname()

  const sismoBaseUrl = turboIntegrations.sismo.href
  return (
    <aside aria-label="Sidebar" className="w-full sm:w-64">
      <div className="overflow-y-auto bg-background px-3 py-4 text-left sm:h-full">
        <ArweaveAccountPreview />
        <ul className="space-y-2 font-medium">
          <li>
            <Link href={`${sismoBaseUrl}/auth`}>
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  pathname === `${sismoBaseUrl}/account`
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span>Auth</span>
              </span>
            </Link>
          </li>
          <li>
            <Link href={`${sismoBaseUrl}/claim`}>
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  pathname === `${sismoBaseUrl}/claim`
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span>Claim</span>
              </span>
            </Link>
          </li>
          <li>
            <Link href={`${sismoBaseUrl}/signature`}>
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  pathname === `${sismoBaseUrl}/signature`
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span>Signature</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
