"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { turboIntegrations } from "@/data/turbo-integrations"
import { motion } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { LinkComponent } from "@/components/shared/link-component"
import { useLivepeerApiKey } from "@/integrations/livepeer/hooks/use-livepeer-api-key"
import { LivepeerProvider } from "@/integrations/livepeer/livepeer-provider"

const livestreamPath = "/integration/livepeer/livestream"
const videoOnDemandPath = "/integration/livepeer/vod"

export default function LayoutIntegration({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const [livepeerApiKey] = useLivepeerApiKey()

  return (
    <LivepeerProvider customApiKey={livepeerApiKey}>
      <motion.div
        animate="show"
        className="mt-20 h-full w-full"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <div className="flex-center flex flex-1 flex-col items-center justify-center">
          <div className="max-w-screen-xl px-5 text-center xl:px-0">
            <motion.h1
              className="text-gradient-sand my-4 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              {turboIntegrations.livepeer.name}
            </motion.h1>
            <motion.p
              className="my-4 text-lg"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Balancer>{turboIntegrations.livepeer.description}</Balancer>
            </motion.p>
            <motion.div
              className="my-4 text-xl"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Link
                href={turboIntegrations.livepeer.url}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Documentation
              </Link>
              <motion.div
                className="mt-8 flex flex-col justify-center gap-x-14 text-2xl sm:flex-row"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                <LinkComponent href={videoOnDemandPath}>
                  <Button
                    className={cn(pathname === livestreamPath && "opacity-50")}
                  >
                    Video on demand
                  </Button>
                </LinkComponent>
                <LinkComponent href={livestreamPath}>
                  <Button
                    className={cn(
                      pathname === videoOnDemandPath && "opacity-50"
                    )}
                  >
                    Livestream
                  </Button>
                </LinkComponent>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="flex h-full w-full justify-center"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div className="w-7/12">{children}</div>
        </motion.div>
      </motion.div>
    </LivepeerProvider>
  )
}
