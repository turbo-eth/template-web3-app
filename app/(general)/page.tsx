'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCheck, FaCopy, FaDiscord, FaGithub } from 'react-icons/fa'
import Balancer from 'react-wrap-balancer'

import { WalletAddress } from '@/components/blockchain/wallet-address'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import Card from '@/components/shared/card'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { DEPLOY_URL, siteConfig } from '@/config/site'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ERC20Decimals, ERC20Name, ERC20Symbol } from '@/integrations/erc20/components/erc20-read'
import { ERC721TokenUriImage, ERC721TokenUriName } from '@/integrations/erc721'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'
import { IsSignedIn } from '@/integrations/siwe/components/is-signed-in'
import { IsSignedOut } from '@/integrations/siwe/components/is-signed-out'

export default function Home() {
  const [copied, setCopied] = useState(false)

  return (
    <>
      <div className="relative flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <motion.div
            animate="show"
            className="max-w-3xl px-5 xl:px-0"
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
            <img alt="Turbo ETH" className="mx-auto mb-10 h-20 w-20" src="/logo-fill.png" />
            <motion.h1
              className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm dark:from-stone-100 dark:to-yellow-200 md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Build Web3 in Turbo Mode</Balancer>
            </motion.h1>
            <motion.p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer className="text-xl font-semibold">{siteConfig.description}</Balancer>
            </motion.p>
            <motion.div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-y-3 space-x-4" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <LinkComponent
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
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
                className="group mx-auto mt-8 flex max-w-fit cursor-pointer items-center justify-between gap-x-2 rounded-xl border border-gray-200 bg-white px-3 py-4 text-sm font-medium shadow-md transition-colors dark:border-gray-800 dark:bg-neutral-800 dark:text-white hover:dark:border-gray-600/70 hover:dark:bg-neutral-700/70 md:px-6 md:text-lg"
                variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <pre>pnpm create turbo-eth@latest</pre>
                <span className="flex-center flex h-4 w-4 cursor-pointer rounded-md text-neutral-600 dark:text-neutral-100 md:h-7 md:w-7">
                  {copied ? <FaCheck /> : <FaCopy />}
                </span>
              </motion.div>
            </CopyToClipboard>
          </motion.div>
          <div className="mt-10">
            <motion.div
              animate="show"
              className="my-10 grid w-full max-w-screen-2xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0"
              initial="hidden"
              viewport={{ once: true }}
              whileInView="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    delayChildren: 0.5,
                    staggerChildren: 0.15,
                  },
                },
              }}>
              {features.map(({ ...props }) => (
                <Card key={props.title} {...props} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

const features = [
  {
    title: 'Web3 Components for the power developer',
    description: 'Pre-built Web3 components, powered by WAGMI',
    large: true,
    demo: (
      <div className="mx-auto  justify-between">
        <IsWalletConnected>
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-5 lg:pt-10">
            <div className=" block text-center">
              <WalletAddress isLink truncate />
              <span className="mt-4 block font-mono text-xs font-semibold">&lt;WalletAddress isLink truncate /&gt;</span>
            </div>
          </div>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect className="mx-auto inline-block" />
        </IsWalletDisconnected>
      </div>
    ),
  },
  {
    title: 'One-click Deploy',
    description: 'Start your next Web3 project in ⚡ Turbo Mode with a deploy to [Vercel](https://vercel.com/) in one click.',
    demo: (
      <a href={DEPLOY_URL} rel="noreferrer" target={'_blank'}>
        <img alt="Deploy with Vercel" src="https://vercel.com/button" width={120} />
      </a>
    ),
  },
  {
    title: turboIntegrations.disco.name,
    description: turboIntegrations.disco.description,
    href: turboIntegrations.disco.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Disco logo" className="rounded-full" height={100} src="/integrations/disco.jpeg" width={100} />
      </div>
    ),
  },
  {
    title: 'Sign-In With Ethereum',
    description: turboIntegrations.siwe.description,
    href: turboIntegrations.siwe.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Prisma logo" height={80} src="/integrations/siwe.svg" width={80} />
      </div>
    ),
  },
  {
    title: 'Rainbowkit',
    description: 'The best way to connect a wallet. Designed for everyone. Built for developers.',
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Rainbow logo" height={100} src="/integrations/rainbowkit.svg" width={100} />
      </div>
    ),
  },
  {
    title: turboIntegrations.etherscan.name,
    description: turboIntegrations.etherscan.description,
    href: turboIntegrations.etherscan.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Etherscan logo" height={100} src="/integrations/etherscan-dark.svg" width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Etherscan logo" height={100} src="/integrations/etherscan-light.svg" width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: 'Web3 Login',
    description: 'Authenticate using an Ethereum Account',
    demo: (
      <div className="text-center text-gray-800">
        <IsWalletConnected>
          <IsSignedIn>
            <ButtonSIWELogout className="btn btn-blue btn-lg " />
          </IsSignedIn>
          <IsSignedOut>
            <ButtonSIWELogin className="btn btn-emerald" label="Sign-In With Ethereum" />
          </IsSignedOut>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect />
        </IsWalletDisconnected>
      </div>
    ),
  },
  {
    title: 'ERC20 WAGMI',
    description: 'Read and Write to ERC20 smart contracts using minimal UI components.',
    demo: (
      <div className="min-w-[220px] text-center">
        <img
          alt={`Token USDC icon`}
          className="mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md"
          src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`}
        />
        <h3 className="mt-4 text-2xl font-normal">
          <ERC20Name address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as '0x${string}'} chainId={1} /> (
          <ERC20Symbol address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as '0x${string}'} chainId={1} className="" />)
        </h3>
        <p className="">
          Decimals <ERC20Decimals address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as '0x${string}'} chainId={1} />
        </p>
        <LinkComponent className="btn btn-light btn-sm mt-4 font-bold" href={`integration/erc20`}>
          View Token Page
        </LinkComponent>
      </div>
    ),
  },
  {
    title: 'ERC721 WAGMI',
    description: 'Read and Write to ERC721 smart contracts using minimal UI components.',
    demo: (
      <div className="text-center">
        <ERC721TokenUriName address={'0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8'} chainId={1} tokenId={BigInt(1)} />
        <ERC721TokenUriImage
          address={'0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8'}
          chainId={1}
          className="mx-auto my-4 rounded-xl border-2 border-white shadow-md"
          height={100}
          tokenId={BigInt(1)}
          width={100}
        />
        <LinkComponent className="btn btn-light btn-sm mt-4 font-bold" href={`/integration/erc721`}>
          View Token Page
        </LinkComponent>
      </div>
    ),
  },
  {
    title: turboIntegrations.sessionKeys.name,
    description: turboIntegrations.sessionKeys.description,
    href: turboIntegrations.sessionKeys.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Session keys logo" height={100} src={turboIntegrations.sessionKeys.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Session keys logo" height={100} src={turboIntegrations.sessionKeys.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.litProtocol.name,
    description: turboIntegrations.litProtocol.description,
    href: turboIntegrations.litProtocol.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Lit Protocol logo" height={100} src={turboIntegrations.litProtocol.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Lit Protocol logo" height={100} src={turboIntegrations.litProtocol.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.openai.name,
    description: turboIntegrations.openai.description,
    href: turboIntegrations.openai.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="OpenAI logo" height={100} src={turboIntegrations.openai.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="OpenAI logo" height={100} src={turboIntegrations.openai.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.pooltogether_v4.name,
    description: turboIntegrations.pooltogether_v4.description,
    href: turboIntegrations.pooltogether_v4.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="PoolTogether logo" height={100} src={turboIntegrations.pooltogether_v4.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="PoolTogether logo" height={100} src={turboIntegrations.pooltogether_v4.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.livepeer.name,
    description: turboIntegrations.livepeer.description,
    href: turboIntegrations.livepeer.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Livepeer logo" height={100} src={turboIntegrations.livepeer.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Livepeer logo" height={100} src={turboIntegrations.livepeer.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.connext.name,
    description: turboIntegrations.connext.description,
    href: turboIntegrations.connext.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt={`${turboIntegrations.connext.name} logo`} height={100} src={turboIntegrations.connext.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt={`${turboIntegrations.connext.name} logo`} height={100} src={turboIntegrations.connext.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.gelato.name,
    description: turboIntegrations.gelato.description,
    href: turboIntegrations.gelato.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt={`${turboIntegrations.gelato.name} logo`} height={100} src={turboIntegrations.gelato.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt={`${turboIntegrations.gelato.name} logo`} height={100} src={turboIntegrations.gelato.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.push_protocol.name,
    description: turboIntegrations.push_protocol.description,
    href: turboIntegrations.push_protocol.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Push Protocol logo" height={100} src={turboIntegrations.push_protocol.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Push Protocol logo" height={100} src={turboIntegrations.push_protocol.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.moralis.name,
    description: turboIntegrations.moralis.description,
    href: turboIntegrations.moralis.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Moralis logo" height={100} src={turboIntegrations.moralis.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Mtarter logo" height={100} src={turboIntegrations.moralis.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.aave.name,
    description: turboIntegrations.aave.description,
    href: turboIntegrations.aave.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Aave logo" height={100} src={turboIntegrations.aave.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Aave logo" height={100} src={turboIntegrations.aave.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.arweave.name,
    description: turboIntegrations.arweave.description,
    href: turboIntegrations.arweave.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Arweave logo" height={100} src={turboIntegrations.arweave.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Arweave logo" height={100} src={turboIntegrations.arweave.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: turboIntegrations.starter.name,
    description: turboIntegrations.starter.description,
    href: turboIntegrations.starter.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <IsLightTheme>
          <Image alt="Starter logo" height={100} src={turboIntegrations.starter.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Starter logo" height={100} src={turboIntegrations.starter.imgLight} width={100} />
        </IsDarkTheme>
      </div>
    ),
  },
]
