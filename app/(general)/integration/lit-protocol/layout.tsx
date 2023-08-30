"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { turboIntegrations } from "@/data/turbo-integrations"
import { motion } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { cn } from "@/lib/utils"
import { LinkComponent } from "@/components/shared/link-component"

interface LayoutIntegrationProps {
  children: ReactNode
}

const sharePath = "/integration/lit-protocol/share"
const unsealPath = "/integration/lit-protocol/unseal"

export default function LayoutIntegration({
  children,
}: LayoutIntegrationProps) {
  const pathname = usePathname()
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center">
        <motion.div
          animate="show"
          className="max-w-screen-xl px-5 text-center xl:px-0"
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
          <motion.h1
            className="text-gradient-sand my-4 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            {turboIntegrations.litProtocol.name}
          </motion.h1>
          <motion.p
            className="my-4 text-lg"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>{turboIntegrations.litProtocol.description}</Balancer>
          </motion.p>
          <motion.div
            className="my-4 text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <LinkComponent
              isExternal
              className="btn btn-primary"
              href={turboIntegrations.litProtocol.url}
            >
              Documentation
            </LinkComponent>
          </motion.div>
          <motion.div
            className="mt-8 flex justify-center gap-14 text-2xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <LinkComponent
              className={cn(
                "btn hover:opacity-75",
                pathname === unsealPath && "opacity-50"
              )}
              href={sharePath}
            >
              Share
            </LinkComponent>
            <LinkComponent
              className={cn(
                "btn hover:opacity-75",
                pathname === sharePath && "opacity-50"
              )}
              href={unsealPath}
            >
              Unseal
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      {children}
    </>
  )
}
