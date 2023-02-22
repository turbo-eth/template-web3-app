'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { useAccount } from 'wagmi'

import TransactionsTable from '@/components/blockchain/transactions-table'
import WalletConnect from '@/components/blockchain/wallet-connect'
import DiscoProfileBasic from '@/components/disco/disco-profile-basic'
import DiscoProfileCredentials from '@/components/disco/disco-profile-credentials'
import { BranchColorMode } from '@/components/shared/branch-color-mode'
import BranchIsAuthenticated from '@/components/shared/branch-is-authenticated'
import BranchIsWalletConnected from '@/components/shared/branch-is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import ButtonSIWELogin from '@/components/siwe/button-siwe-login'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'

export default function PageApplication() {
  const { address } = useAccount()
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center">
        <motion.div
          className="max-w-3xl px-5 text-center xl:px-0"
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
          <BranchColorMode>
            <Image className="mx-auto" alt="Etherscan logo" src={turboIntegrations.disco.imgDark} width={100} height={100} />
            <Image className="mx-auto" alt="Etherscan logo" src={turboIntegrations.disco.imgLight} width={100} height={100} />
          </BranchColorMode>
          <motion.h1
            className="text-gradient-sand my-8 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            {turboIntegrations.disco.name}
          </motion.h1>
          <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.disco.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.disco.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>

        <hr className="my-5" />
        <BranchIsWalletConnected>
          <BranchIsAuthenticated>
            <div className="w-full">
              <section className="flex flex-col gap-y-10">
                <div className="card container max-w-screen-xl">
                  <h3 className="text-4xl font-bold">Disco Profile</h3>
                  <hr className="my-4" />
                  <DiscoProfileBasic address={address} />
                </div>
                <div className="card container max-w-screen-xl">
                  <h3 className="text-4xl font-bold">Disco Verifiable Credentials</h3>
                  <hr className="my-4" />
                  <DiscoProfileCredentials address={address} />
                </div>
              </section>
            </div>
            <>
              <div className="text-center">
                <ButtonSIWELogin className="btn btn-emerald" label="Web3 Connect" />
                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-200">
                  Accessing the Disco API requires authenticating with an Ethereum Account.
                </p>
              </div>
            </>
          </BranchIsAuthenticated>
          <WalletConnect className="mx-auto inline-block" />
        </BranchIsWalletConnected>
      </div>
    </>
  )
}
