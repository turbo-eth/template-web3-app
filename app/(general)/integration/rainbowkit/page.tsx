'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { useNetwork } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchColorMode } from '@/components/shared/branch-color-mode'
import { BranchIsAuthenticated } from '@/components/shared/branch-is-authenticated'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import TransactionsTable from '@/integrations/etherscan/components/transactions-table'
import { useEtherscanAccountTransactions } from '@/integrations/etherscan/hooks/use-etherscan-account-transactions'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'

export default function PageIntegration() {
  const { chain } = useNetwork()
  const { isLoading, data } = useEtherscanAccountTransactions({
    chainId: chain?.id || 1,
  })
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center text-center">
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
            <Image className="mx-auto" alt="Rainbow logo" src={turboIntegrations.rainbowkit.imgDark} width={100} height={100} />
            <Image className="mx-auto" alt="Rainbow logo" src={turboIntegrations.rainbowkit.imgLight} width={100} height={100} />
          </BranchColorMode>
          <motion.h1
            className="text-gradient-sand my-8 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            {turboIntegrations.rainbowkit.name}
          </motion.h1>
          <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.rainbowkit.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent href={turboIntegrations.rainbowkit.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>

        <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center">
          <WalletConnect className="inline-block" />
        </div>
      </div>
    </>
  )
}
