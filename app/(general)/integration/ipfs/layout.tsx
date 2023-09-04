'use client'
import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'

import { SideBar } from './sidebar'
import { PageHeader, PageHeaderCTA, PageHeaderDescription, PageHeaderHeading } from '@/components/layout/page-header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { LuBook } from 'react-icons/lu'
import { PageSection } from '@/components/layout/page-section'
import { LightDarkImage } from '@/components/shared/light-dark-image'
import { FormOpenAIPrompt } from '@/integrations/openai/components/form-openai-prompt'

const integrationData = turboIntegrations.ipfs

export default function LayoutIntegration({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <div className="flex-center w-full flex-col items-center justify-center text-center">
        <motion.div
          animate="show"
          className="max-w-3xl px-5 text-center xl:px-0"
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
          }}>
          <IsLightTheme>
            <Image alt="Starter logo" className="mx-auto" height={100} src={integrationData.imgDark} width={100} />
          </IsLightTheme>
          <IsDarkTheme>
            <Image alt="Starter logo" className="mx-auto" height={100} src={integrationData.imgLight} width={100} />
          </IsDarkTheme>
          <motion.h1
            className="text-gradient-sand my-8 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            {integrationData.name}
          </motion.h1>
          <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{integrationData.description}</Balancer>
          </motion.p>
          <PageHeaderCTA>
          <Link
            href={turboIntegrations.ipfs.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
        </motion.div>
        <motion.div className="container my-4 w-full text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <section className="mt-10 flex flex-col overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-900 sm:flex-row">
            <SideBar />
            <div className="flex-center min-h-[600px] flex-1 flex-col items-center justify-center p-10 text-center">{children}</div>
          </section>
        </motion.div>
      </div> */}
      <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.ipfs.imgDark}
          DarkImage={turboIntegrations.ipfs.imgLight}
          alt="OpenAI Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>IPFS</PageHeaderHeading>
        <PageHeaderDescription>
          {turboIntegrations.ipfs.description}
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.ipfs.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>
      <motion.div className="container my-4 w-full text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <section className="mt-10 flex flex-col overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-900 sm:flex-row">
            <SideBar />
            <div className="flex-center min-h-[600px] flex-1 flex-col items-center justify-center p-10 text-center">{children}</div>
          </section>
        </motion.div>
      </PageSection>
      
    </div>
    </>
  )
}
