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

  const arweaveBaseUrl = turboIntegrations.arweave.href
  return (
    <aside aria-label="Sidebar" className="w-full sm:w-64">
      <div className="overflow-y-auto bg-background px-3 py-4 text-left sm:h-full">
        <ArweaveAccountPreview />
        <ul className="space-y-2 font-medium">
          <li>
            <Link href={`${arweaveBaseUrl}/account`}>
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  pathname === `${arweaveBaseUrl}/account`
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span>Arweave Account</span>
              </span>
            </Link>
          </li>
          <li>
            <Link href={`${arweaveBaseUrl}/posts`}>
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  pathname === `${arweaveBaseUrl}/posts`
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span>Posts</span>
              </span>
            </Link>
          </li>
          <li>
            <Link href={`${arweaveBaseUrl}/posts/new`}>
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  pathname === `${arweaveBaseUrl}/posts/new`
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span>New Posts</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
