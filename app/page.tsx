'use client'

// @ts-nocheck
import { WalletAddress } from '@turbo-eth/core-wagmi'
import { WalletBalance } from '@turbo-eth/core-wagmi'
import { ERC20Decimals, ERC20Name, ERC20Symbol } from '@turbo-eth/erc20-wagmi'
import { ERC721Image, ERC721Name } from '@turbo-eth/erc721-wagmi'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import Balancer from 'react-wrap-balancer'

import { BranchColorMode } from '@/components/shared/branch/BranchColorMode'
import { BranchIsAuthenticated } from '@/components/shared/branch/BranchIsAuthenticated'
import { BranchIsWalletConnected } from '@/components/shared/branch/BranchIsWalletConnected'
import Card from '@/components/shared/card'
import ButtonSIWELogin from '@/components/web3/siwe/ButtonSIWELogin'
import ButtonSIWELogout from '@/components/web3/siwe/ButtonSIWELogout'
import WalletConnect from '@/components/web3/WalletConnect'
import { DEPLOY_URL } from '@/config/constants'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { siteConfig } from '@/config/site'
import erc20TokenSymbolToAddress from '@/lib/erc20TokenSymbolToAddress'

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
              className="font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm dark:from-stone-100 dark:to-yellow-200 md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Build Web3 In Turbo Mode</Balancer>
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
            <p className="mt-6">TurboETH is in active development i.e. early alpha.</p>
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
              {features.map(({ title, description, demo, large }) => (
                <Card key={title} title={title} description={description} demo={demo} large={large} />
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
            <div className="mt-6 block text-center lg:mt-0">
              <WalletBalance decimals={4} styled />
              <span className="mt-4 block font-mono text-xs font-semibold">&lt;WalletBalance {`decimals={4}`} styled /&gt;</span>
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://vercel.com/button" alt="Deploy with Vercel" width={120} />
      </a>
    ),
  },
  {
    title: 'Rainbow Kit',
    description: 'The best way to connect a wallet Designed for everyone. Built for developers.',
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Rainbow logo" src="/rainbow.svg" width={100} height={100} />
      </div>
    ),
  },
  {
    title: 'Sign-In With Ethereum',
    description: 'Authenticate users using a Web3 wallet like MetaMask or WalletConnect.',
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Prisma logo" src="/siwe.svg" width={80} height={80} />
      </div>
    ),
  },
  {
    title: 'Etherscan',
    description: 'Request additional information about a transaction or address from Etherscan.',
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <BranchColorMode>
          <Image alt="Etherscan logo" src="/etherscan.svg" width={100} height={100} />
          <Image alt="Etherscan logo" src="/etherscan-light.svg" width={100} height={100} />
        </BranchColorMode>
      </div>
    ),
  },
  {
    title: 'Authenticate with Web3',
    description: 'Connect to the Future of Web3 with TurboETH',
    demo: (
      <div className="text-center text-gray-800">
        <BranchIsWalletConnected>
          <BranchIsAuthenticated>
            <ButtonSIWELogout className="btn btn-blue btn-lg " />
            <ButtonSIWELogin className="btn btn-emerald btn-lg min-h-[70px] min-w-[200px] text-xl" label="ΞID Connect" />
          </BranchIsAuthenticated>
          <WalletConnect />
        </BranchIsWalletConnected>
      </div>
    ),
  },
  // {
  //   title: '⚡Turbo actions, and hooks',
  //   description: 'TurboETH offers a collection of actions, hooks and utilities',
  //   demo: (
  //     <div className="grid min-w-[220px] grid-flow-col grid-rows-3 gap-10 p-10">
  //       <span className="font-mono font-semibold">&lt;Address/&gt;</span>
  //       <span className="font-mono font-semibold">&lt;Balance /&gt;</span>
  //       <span className="font-mono font-semibold">&lt;Nonce /&gt;</span>
  //       <span className="font-mono font-semibold">&lt;ERC20Name /&gt;</span>
  //       <span className="font-mono font-semibold">&lt;ERC20Symbol /&gt;</span>
  //       <span className="font-mono font-semibold">&lt;ERC20Balance /&gt;</span>
  //     </div>
  //   ),
  // },
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
          <ERC20Name chainId={1} address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'} /> (
          <ERC20Symbol className="" chainId={1} address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'} />)
        </h3>
        <p className="">
          Decimals <ERC20Decimals chainId={1} address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'} />
        </p>
        <Link className="btn btn-light btn-sm mt-4 font-bold" href={`/1/erc20/${erc20TokenSymbolToAddress.USDC}`}>
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
        {/* @ts-ignore */}
        <ERC721Name chainId={1} tokenId={1} address={'0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8'} />
        <ERC721Image
          // @ts-ignore
          tokenId={1}
          address={'0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8'}
          className=" mx-auto my-4 w-[90px] rounded-xl border-2 border-white shadow-md"
        />
        <Link className="btn btn-light btn-sm mt-4 font-bold" href={`/1/erc721/0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8/42`}>
          View Token Page
        </Link>
      </div>
    ),
  },
]
