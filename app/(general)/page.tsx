'use client'

import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import Balancer from 'react-wrap-balancer'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function Home() {
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
            <motion.div className="mx-auto mt-6 flex items-center justify-center space-x-5" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <a
                className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                href={'https://docs.turboeth.xyz/'}
                target="_blank"
                rel="noopener noreferrer">
                <span className="text-xl">⚡️</span>
                <span className="font-bold">TurboETH Documentation</span>
              </a>
              <a
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
                href="https://github.com/turbo-eth/template-web3-app"
                target="_blank"
                rel="noopener noreferrer">
                <FaGithub />
                <p>Star on GitHub</p>
              </a>
            </motion.div>
            <motion.p className="mt-6 text-center text-sm" variants={FADE_DOWN_ANIMATION_VARIANTS}>
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
