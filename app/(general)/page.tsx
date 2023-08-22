'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCheck, FaCopy, FaDiscord, FaGithub } from 'react-icons/fa'
import Balancer from 'react-wrap-balancer'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { siteConfig } from '@/config/site'

export default function Home() {
  const [copied, setCopied] = useState(false)

  return (
    <>
      <div className="relative flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <motion.div
            className="max-w-3xl px-5 xl:px-0"
            initial="hidden"
            whileInView="show"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            <img src="/logo-fill.png" alt="Turbo ETH" className="mx-auto mb-10 h-20 w-20" />
            <motion.h1
              className="text-gradient-sand text-center text-6xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Get Started</Balancer>
            </motion.h1>
            <motion.p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer className="text-xl font-semibold">Start building next generation Web3 apps today</Balancer>
            </motion.p>
            <motion.div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-y-3 space-x-4" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <LinkComponent
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                href={'https://docs.turboeth.xyz/'}>
                <span className="text-xl">⚡️</span>
                <span className="font-bold">TurboETH Documentation</span>
              </LinkComponent>
              <LinkComponent
                className="flex max-w-fit items-center justify-center space-x-2  rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
                href={siteConfig.links.github}>
                <FaGithub />
                <p>Star on GitHub</p>
              </LinkComponent>
              <LinkComponent
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-indigo-400 bg-indigo-500 px-5 py-2 text-sm text-white shadow-md transition-colors hover:border-indigo-600"
                href={siteConfig.links.discord}>
                <FaDiscord />
                <p>Join us on Discord</p>
              </LinkComponent>
            </motion.div>
            <CopyToClipboard text="pnpm create turbo-eth@latest" onCopy={() => setCopied(true)}>
              <motion.div
                className="group mx-auto mt-8 flex max-w-fit cursor-pointer items-center justify-between gap-x-2 rounded-xl border border-gray-200 bg-white py-4 px-3 text-sm font-medium shadow-md transition-colors dark:border-gray-800 dark:bg-neutral-800 dark:text-white hover:dark:border-gray-600/70 hover:dark:bg-neutral-700/70 md:px-6 md:text-lg"
                variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <pre>pnpm create turbo-eth@latest</pre>
                <span className="flex-center flex h-4 w-4 cursor-pointer rounded-md text-neutral-600 dark:text-neutral-100 md:h-7 md:w-7">
                  {copied ? <FaCheck /> : <FaCopy />}
                </span>
              </motion.div>
            </CopyToClipboard>
            <motion.p className="mt-8 text-center text-sm" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <LinkComponent className="link" href="https://github.com/turbo-eth/template-web3-app/tree/integrations">
                Click here to view the <span className="font-bold">integrations branch</span> for more examples.
              </LinkComponent>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
