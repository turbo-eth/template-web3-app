'use client'

import { WalletAddress } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchColorMode } from '@/components/shared/branch-color-mode'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import Card from '@/components/shared/card'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { DEPLOY_URL, siteConfig } from '@/config/site'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ERC20Decimals, ERC20Name, ERC20Symbol } from '@/integrations/erc20/components/erc20-read'
import { ERC721TokenUriImage, ERC721TokenUriName } from '@/integrations/erc721'
import { BranchIsAuthenticated } from '@/integrations/siwe/components/branch-is-authenticated'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'

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
              className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm dark:from-stone-100 dark:to-yellow-200 md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Build Web3 in Turbo Mode</Balancer>
            </motion.h1>
            <motion.p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer className="text-xl font-semibold">{siteConfig.description}</Balancer>
            </motion.p>
            <motion.div className="mx-auto mt-6 flex items-center justify-center space-x-5" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <a
                className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                href={DEPLOY_URL}
                target="_blank"
                rel="noopener noreferrer">
                <svg className="h-4 w-4 group-hover:text-black" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L20 20H4L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Deploy to Vercel</p>
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
            <span className="tag mt-6">⚡️TurboETH is in active development.</span>
          </motion.div>

          <div className="mt-10">
            <motion.div
              className="my-10 grid w-full max-w-screen-2xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0"
              initial="hidden"
              whileInView="show"
              animate="show"
              viewport={{ once: true }}
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
    description:
      'Pre-built Web3 components, powered by WAGMI [Core WAGMI](https://github.com/turbo-eth/core-wagmi), [ERC20 WAGMI](https://github.com/turbo-eth/erc20-wagmi), and [ERC721 WAGMI](https://github.com/turbo-eth/erc721-wagmi)',
    large: true,
    demo: (
      <div className="mx-auto  justify-between">
        <BranchIsWalletConnected>
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-5 lg:pt-10">
            <div className=" block text-center">
              <WalletAddress truncate styled isLink />
              <span className="mt-4 block font-mono text-xs font-semibold">&lt;WalletAddress isLink truncate styled /&gt;</span>
            </div>
          </div>
          <WalletConnect className="mx-auto inline-block" />
        </BranchIsWalletConnected>
      </div>
    ),
  },
  {
    title: 'One-click Deploy',
    description: 'Start your next Web3 project in ⚡ Turbo Mode with a deploy to [Vercel](https://vercel.com/) in one click.',
    demo: (
      <a target={'_blank'} href={DEPLOY_URL} rel="noreferrer">
        <img src="https://vercel.com/button" alt="Deploy with Vercel" width={120} />
      </a>
    ),
  },
  {
    title: turboIntegrations.disco.name,
    description: turboIntegrations.disco.description,
    href: turboIntegrations.disco.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Disco logo" src="/integrations/disco.jpeg" className="rounded-full" width={100} height={100} />
      </div>
    ),
  },
  {
    title: 'Sign-In With Ethereum',
    description: turboIntegrations.siwe.description,
    href: turboIntegrations.siwe.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Prisma logo" src="/integrations/siwe.svg" width={80} height={80} />
      </div>
    ),
  },
  {
    title: turboIntegrations.etherscan.name,
    description: turboIntegrations.etherscan.description,
    href: turboIntegrations.etherscan.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <BranchColorMode>
          <Image alt="Etherscan logo" src="/integrations/etherscan-dark.svg" width={100} height={100} />
          <Image alt="Etherscan logo" src="/integrations/etherscan-light.svg" width={100} height={100} />
        </BranchColorMode>
      </div>
    ),
  },
  {
    title: turboIntegrations.rainbowkit.name,
    description: turboIntegrations.rainbowkit.description,
    href: turboIntegrations.rainbowkit.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Rainbow logo" src="/integrations/rainbowkit.svg" width={100} height={100} />
      </div>
    ),
  },
  {
    title: 'Web3 Login',
    description: 'Authenticate using an Ethereum Account',
    demo: (
      <div className="text-center text-gray-800">
        <BranchIsWalletConnected>
          <BranchIsAuthenticated>
            <ButtonSIWELogout className="btn btn-blue btn-lg " />
            <ButtonSIWELogin className="btn btn-emerald" label="Sign-In With Ethereum" />
          </BranchIsAuthenticated>
          <WalletConnect />
        </BranchIsWalletConnected>
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
          <ERC20Name chainId={1} address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as '0x${string}'} /> (
          <ERC20Symbol className="" chainId={1} address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as '0x${string}'} />)
        </h3>
        <p className="">
          Decimals <ERC20Decimals chainId={1} address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as '0x${string}'} />
        </p>
        <Link className="btn btn-light btn-sm mt-4 font-bold" href={`/1/erc20/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`}>
          View Token Page
        </Link>
      </div>
    ),
  },
  {
    title: 'ERC721 WAGMI',
    description: 'Read and Write to ERC721 smart contracts using minimal UI components.',
    demo: (
      <div className="text-center">
        <ERC721TokenUriName chainId={1} tokenId={BigInt(1)} address={'0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8'} />
        <ERC721TokenUriImage
          tokenId={BigInt(1)}
          chainId={1}
          address={'0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8'}
          height={100}
          width={100}
          className="mx-auto my-4 rounded-xl border-2 border-white shadow-md"
        />
        <Link className="btn btn-light btn-sm mt-4 font-bold" href={`/integration/erc721`}>
          View Token Page
        </Link>
      </div>
    ),
  },
  {
    title: turboIntegrations.litProtocol.name,
    description: turboIntegrations.litProtocol.description,
    href: turboIntegrations.litProtocol.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <BranchColorMode>
          <Image alt="Lit Protocol logo" src={turboIntegrations.litProtocol.imgDark} width={100} height={100} />
          <Image alt="Lit Protocol logo" src={turboIntegrations.litProtocol.imgLight} width={100} height={100} />
        </BranchColorMode>
      </div>
    ),
  },
  {
    title: turboIntegrations.openai.name,
    description: turboIntegrations.openai.description,
    href: turboIntegrations.openai.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <BranchColorMode>
          <Image alt="OpenAI logo" src={turboIntegrations.openai.imgDark} width={100} height={100} />
          <Image alt="OpenAI logo" src={turboIntegrations.openai.imgLight} width={100} height={100} />
        </BranchColorMode>
      </div>
    ),
  },
  {
    title: turboIntegrations.pooltogether_v4.name,
    description: turboIntegrations.pooltogether_v4.description,
    href: turboIntegrations.pooltogether_v4.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <BranchColorMode>
          <Image alt="PoolTogether logo" src={turboIntegrations.pooltogether_v4.imgDark} width={100} height={100} />
          <Image alt="PoolTogether logo" src={turboIntegrations.pooltogether_v4.imgLight} width={100} height={100} />
        </BranchColorMode>
      </div>
    ),
  },
]
