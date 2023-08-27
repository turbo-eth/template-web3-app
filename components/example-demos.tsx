"use client"

import Image from "next/image"
import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { motion, MotionProps } from "framer-motion"
import ReactMarkdown from "react-markdown"
import Balancer from "react-wrap-balancer"

import { DEPLOY_URL, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { fadeUpVariant } from "@/lib/utils/motion"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsDarkTheme } from "@/components/shared/is-dark-theme"
import { IsLightTheme } from "@/components/shared/is-light-theme"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { LinkComponent } from "@/components/shared/link-component"
import {
  ERC20Decimals,
  ERC20Name,
  ERC20Symbol,
} from "@/integrations/erc20/components/erc20-read"
import { ERC721TokenUriImage, ERC721TokenUriName } from "@/integrations/erc721"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { ButtonSIWELogout } from "@/integrations/siwe/components/button-siwe-logout"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

import { LightDarkImage } from "./light-dark-image"
import { PageSectionGrid } from "./page-section"
import { buttonVariants } from "./ui/button"

const demos = [
  {
    title: "Web3 Components for the power developer",
    description: "Pre-built Web3 components, powered by WAGMI",
    large: true,
    demo: (
      <div className="mx-auto  justify-between">
        <IsWalletConnected>
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-5 lg:pt-10">
            <div className=" block text-center">
              <WalletAddress isLink truncate />
              <span className="mt-4 block font-mono text-xs font-semibold">
                &lt;WalletAddress isLink truncate /&gt;
              </span>
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
    title: "One-click Deploy",
    description:
      "Start your next Web3 project in ⚡ Turbo Mode with a deploy to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <a href={DEPLOY_URL} rel="noreferrer" target={"_blank"}>
        <img
          alt="Deploy with Vercel"
          src="https://vercel.com/button"
          width={120}
        />
      </a>
    ),
  },
  {
    title: turboIntegrations.disco.name,
    description: turboIntegrations.disco.description,
    href: turboIntegrations.disco.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image
          alt="Disco logo"
          className="rounded-full"
          height={100}
          src="/integrations/disco.jpeg"
          width={100}
        />
      </div>
    ),
  },
  {
    title: "Sign-In With Ethereum",
    description: turboIntegrations.siwe.description,
    href: turboIntegrations.siwe.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image
          alt="Prisma logo"
          height={80}
          src="/integrations/siwe.svg"
          width={80}
        />
      </div>
    ),
  },
  {
    title: "Rainbowkit",
    description:
      "The best way to connect a wallet. Designed for everyone. Built for developers.",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image
          alt="Rainbow logo"
          height={100}
          src="/integrations/rainbowkit.svg"
          width={100}
        />
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
          <Image
            alt="Etherscan logo"
            height={100}
            src="/integrations/etherscan-dark.svg"
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Etherscan logo"
            height={100}
            src="/integrations/etherscan-light.svg"
            width={100}
          />
        </IsDarkTheme>
      </div>
    ),
  },
  {
    title: "Web3 Login",
    description: "Authenticate using an Ethereum Account",
    demo: (
      <div className="text-center text-gray-800">
        <IsWalletConnected>
          <IsSignedIn>
            <ButtonSIWELogout className="btn btn-blue btn-lg " />
          </IsSignedIn>
          <IsSignedOut>
            <ButtonSIWELogin
              className="btn btn-emerald"
              label="Sign-In With Ethereum"
            />
          </IsSignedOut>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect />
        </IsWalletDisconnected>
      </div>
    ),
  },
  {
    title: "ERC20 WAGMI",
    description:
      "Read and Write to ERC20 smart contracts using minimal UI components.",
    demo: (
      <div className="min-w-[220px] text-center">
        <img
          alt={`Token USDC icon`}
          className="mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md"
          src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`}
        />
        <h3 className="mt-4 text-2xl font-normal">
          <ERC20Name
            address={
              "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as "0x${string}"
            }
            chainId={1}
          />{" "}
          (
          <ERC20Symbol
            address={
              "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as "0x${string}"
            }
            chainId={1}
            className=""
          />
          )
        </h3>
        <p className="">
          Decimals{" "}
          <ERC20Decimals
            address={
              "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as "0x${string}"
            }
            chainId={1}
          />
        </p>
        <LinkComponent
          className="btn btn-light btn-sm mt-4 font-bold"
          href={`integration/erc20`}
        >
          View Token Page
        </LinkComponent>
      </div>
    ),
  },
  {
    title: "ERC721 WAGMI",
    description:
      "Read and Write to ERC721 smart contracts using minimal UI components.",
    demo: (
      <div className="text-center">
        <ERC721TokenUriName
          address={"0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8"}
          chainId={1}
          tokenId={BigInt(1)}
        />
        <ERC721TokenUriImage
          address={"0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8"}
          chainId={1}
          className="mx-auto my-4 rounded-xl border-2 border-white shadow-md"
          height={100}
          tokenId={BigInt(1)}
          width={100}
        />
        <LinkComponent
          className="btn btn-light btn-sm mt-4 font-bold"
          href={`/integration/erc721`}
        >
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
          <Image
            alt="Session keys logo"
            height={100}
            src={turboIntegrations.sessionKeys.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Session keys logo"
            height={100}
            src={turboIntegrations.sessionKeys.imgLight}
            width={100}
          />
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
          <Image
            alt="Lit Protocol logo"
            height={100}
            src={turboIntegrations.litProtocol.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Lit Protocol logo"
            height={100}
            src={turboIntegrations.litProtocol.imgLight}
            width={100}
          />
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
          <Image
            alt="OpenAI logo"
            height={100}
            src={turboIntegrations.openai.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="OpenAI logo"
            height={100}
            src={turboIntegrations.openai.imgLight}
            width={100}
          />
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
          <Image
            alt="PoolTogether logo"
            height={100}
            src={turboIntegrations.pooltogether_v4.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="PoolTogether logo"
            height={100}
            src={turboIntegrations.pooltogether_v4.imgLight}
            width={100}
          />
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
          <Image
            alt="Livepeer logo"
            height={100}
            src={turboIntegrations.livepeer.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Livepeer logo"
            height={100}
            src={turboIntegrations.livepeer.imgLight}
            width={100}
          />
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
          <Image
            alt={`${turboIntegrations.connext.name} logo`}
            height={100}
            src={turboIntegrations.connext.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt={`${turboIntegrations.connext.name} logo`}
            height={100}
            src={turboIntegrations.connext.imgLight}
            width={100}
          />
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
          <Image
            alt={`${turboIntegrations.gelato.name} logo`}
            height={100}
            src={turboIntegrations.gelato.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt={`${turboIntegrations.gelato.name} logo`}
            height={100}
            src={turboIntegrations.gelato.imgLight}
            width={100}
          />
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
          <Image
            alt="Push Protocol logo"
            height={100}
            src={turboIntegrations.push_protocol.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Push Protocol logo"
            height={100}
            src={turboIntegrations.push_protocol.imgLight}
            width={100}
          />
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
          <LightDarkImage
            LightImage={turboIntegrations.moralis.imgDark}
            DarkImage={turboIntegrations.moralis.imgLight}
            alt="Moralis logo"
            height={100}
            width={100}
          />
      </div>
    ),
  },
  {
    title: turboIntegrations.aave.name,
    description: turboIntegrations.aave.description,
    href: turboIntegrations.aave.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <LightDarkImage
          LightImage={turboIntegrations.aave.imgDark}
          DarkImage={turboIntegrations.aave.imgLight}
          alt="Aave logo"
          height={100}
          width={100}
        />
      </div>
    ),
  },
  {
    title: turboIntegrations.arweave.name,
    description: turboIntegrations.arweave.description,
    href: turboIntegrations.arweave.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <LightDarkImage
          LightImage={turboIntegrations.arweave.imgDark}
          DarkImage={turboIntegrations.arweave.imgLight}
          alt="Arweave logo"
          height={100}
          width={100}
        />
      </div>
    ),
  },
  {
    title: turboIntegrations.starter.name,
    description: turboIntegrations.starter.description,
    href: turboIntegrations.starter.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <LightDarkImage
          LightImage={turboIntegrations.starter.imgDark}
          DarkImage={turboIntegrations.starter.imgLight}
          alt="Starter logo"
          height={100}
          width={100}
        />
      </div>
    ),
  },
]

interface ExampleDemosProps extends MotionProps {
  className?: string
}

export function ExampleDemos({ className, ...props }: ExampleDemosProps) {
  return (
    <PageSectionGrid className={className} {...props}>
      {demos.map(({ title, description, href, demo, large }) => (
        <DemoCard
          key={title}
          title={title}
          description={description}
          href={href}
          demo={demo}
          large={large}
        />
      ))}
    </PageSectionGrid>
  )
}

interface DemoCardProps extends MotionProps {
  demo: React.ReactNode
  title: string
  description: string
  large?: boolean
  href?: string
}

function DemoCard({ title, description, href, demo, large }: DemoCardProps) {
  return (
    <motion.div
      variants={fadeUpVariant()}
      className={`relative col-span-1 overflow-hidden rounded-xl border bg-muted px-4 shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex h-60 items-center justify-center">{demo}</div>
      <div className="mx-auto max-w-xl text-center">
        <h2 className="mb-3 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-xl font-bold text-transparent dark:from-stone-100 dark:to-emerald-200 md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
        <div className="content prose-sm md:prose -mt-2 leading-normal text-muted-foreground">
          <Balancer>
            <ReactMarkdown
              components={{
                a: ({ ...props }) => (
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    {...props}
                    className="font-medium text-foreground underline transition-colors dark:text-blue-200"
                  />
                ),

                code: ({ ...props }) => (
                  <code
                    {...props}
                    className="rounded-sm px-1 py-0.5 font-mono font-medium text-foreground"
                  />
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </Balancer>
        </div>
        {!href ? null : (
          <Link href={href} className={cn(buttonVariants(), "my-4")}>
            Demo
          </Link>
        )}
      </div>
    </motion.div>
  )
}
