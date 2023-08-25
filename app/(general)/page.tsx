import Image from "next/image"
import Link from "next/link"
import { FaDiscord, FaGithub } from "react-icons/fa"
import { LuBook } from "react-icons/lu"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CopyButton } from "@/components/copy-button"
import { ExampleDemos } from "@/components/example-demos"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function HomePage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <Image
          src="/logo-fill.png"
          alt="TurboETH Logo"
          width={80}
          height={80}
          className="h-20 w-20"
        />
        <PageHeaderHeading>Build Web3 in Turbo&nbsp;Mode</PageHeaderHeading>
        <PageHeaderDescription>{siteConfig.description}</PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={siteConfig.links.docs}
            className={buttonVariants({ variant: "default" })}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Docs
          </Link>
          <Link
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "secondary" })}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Github
          </Link>
          <Link
            href={siteConfig.links.discord}
            className={cn(
              buttonVariants(),
              "bg-[#7289da] text-white hover:bg-[#7289da]/80"
            )}
          >
            <FaDiscord className="mr-2 h-4 w-4" />
            Discord
          </Link>
        </PageHeaderCTA>
        <PageHeaderCTA>
          <CopyButton value="pnpm create turbo-eth@latest">
            pnpm create turbo-eth@latest
          </CopyButton>
        </PageHeaderCTA>
      </PageHeader>
      <ExampleDemos />
    </div>
  )
}
