"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { turboIntegrations } from "@/data/turbo-integrations"

import { cn } from "@/lib/utils"

const gitcoinPassportBaseHref = turboIntegrations.gitcoinPassport.href

const links = [
  { title: "Passport", href: gitcoinPassportBaseHref },
  {
    title: "Score gated demo page",
    href: gitcoinPassportBaseHref + "/score-gated",
  },
  {
    title: "Stamp gated demo page",
    href: gitcoinPassportBaseHref + "/stamp-gated",
  },
  { title: "Dev guide", href: gitcoinPassportBaseHref + "/dev-guide" },
]
export const SideBar = () => {
  const pathname = usePathname()

  return (
    <aside aria-label="Sidebar" className="w-full bg-background/30 sm:w-64">
      <div className="overflow-y-auto px-3 py-4 text-left sm:h-full">
        <ul className="space-y-2 font-medium">
          {links.map(({ title, href }) => (
            <li key={href}>
              <Link href={href}>
                <span
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                    pathname === href
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="capitalize">{title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
