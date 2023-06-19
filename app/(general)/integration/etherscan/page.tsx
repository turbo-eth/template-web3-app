'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { useNetwork } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import TransactionsTable from '@/integrations/etherscan/components/transactions-table'
import { useEtherscanAccountTransactions } from '@/integrations/etherscan/hooks/use-etherscan-account-transactions'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { IsSignedIn } from '@/integrations/siwe/components/is-signed-in'
import { IsSignedOut } from '@/integrations/siwe/components/is-signed-out'

export default function PageIntegration() {
  const { chain } = useNetwork()
  const { isLoading, data } = useEtherscanAccountTransactions({
    chainId: chain?.id || 1,
  })
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center text-center">
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
            <Image alt="Etherscan logo" className="mx-auto" height={100} src={turboIntegrations.etherscan.imgDark} width={100} />
          </IsLightTheme>
          <IsDarkTheme>
            <Image alt="Etherscan logo" className="mx-auto" height={100} src={turboIntegrations.etherscan.imgLight} width={100} />
          </IsDarkTheme>
          <motion.h1
            className="text-gradient-sand text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            Etherscan
          </motion.h1>
          <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.etherscan.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.etherscan.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>

        <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center">
          <IsWalletConnected>
            <IsSignedIn>
              <div className="w-full">
                {!isLoading && (
                  <div className="card">
                    <TransactionsTable className="w-full" data={data?.transactions} />
                  </div>
                )}
              </div>
            </IsSignedIn>
            <IsSignedOut>
              <div className="">
                <ButtonSIWELogin className="btn btn-emerald" label="Sign-In With Ethereum" />
                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-200">
                  Accessing the Etherscan API requires authenticating with an Ethereum Account.
                </p>
              </div>
            </IsSignedOut>
          </IsWalletConnected>
          <IsWalletDisconnected>
            <WalletConnect className="mx-auto inline-block" />
          </IsWalletDisconnected>
        </div>
      </div>
    </>
  )
}
