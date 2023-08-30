import Image from "next/image"
import Link from "next/link"
import { FaDiscord, FaGithub } from "react-icons/fa"
import { LuBook } from "react-icons/lu"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
<<<<<<< HEAD
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { CopyButton } from "@/components/shared/copy-button"
import { ExampleDemos } from "@/components/shared/example-demos"
=======
  ERC20Decimals,
  ERC20Name,
  ERC20Symbol,
} from "@/integrations/erc20/components/erc20-read"
import { ERC721TokenUriImage, ERC721TokenUriName } from "@/integrations/erc721"
import {
  ERC1155TokenUriImage,
  ERC1155TokenUriName,
} from "@/integrations/erc1155"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { ButtonSIWELogout } from "@/integrations/siwe/components/button-siwe-logout"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export default function Home() {
  const [copied, setCopied] = useState(false)
>>>>>>> integrations

export default function HomePage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <Image
          src="/logo-fill.png"
          alt="TurboETH Logo"
          width={80}
          height={80}
          className="h-20 w-20"
        />
        <PageHeaderHeading>Build Web3 in Turbo&nbsp;Mode</PageHeaderHeading>
        <PageHeaderDescription>{siteConfig.description}</PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants({ variant: "default" })}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Docs
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants({ variant: "secondary" })}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Github
          </Link>
          <Link
            href={siteConfig.links.discord}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants(),
              "bg-[#7289da] text-white hover:bg-[#7289da]/80"
            )}
          >
            <FaDiscord className="mr-2 h-4 w-4" />
            Discord
          </Link>
        </PageHeaderCTA>
        <PageHeaderCTA>
          <CopyButton value="pnpm create turbo-eth@latest">
            pnpm create turbo-eth@latest
          </CopyButton>
        </PageHeaderCTA>
      </PageHeader>
      <ExampleDemos />
    </div>
  )
}
<<<<<<< HEAD
=======

const features = [
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
    title: "ERC1155 WAGMI",
    description:
      "Read and Write to ERC1155 smart contracts using minimal UI components.",
    demo: (
      <div className="text-center">
        <ERC1155TokenUriName
          address={"0x67bcbc1c0e120d0a700eb38a2d769c20a1dfb8f6"}
          chainId={1}
          tokenId={BigInt(3)}
        />
        <ERC1155TokenUriImage
          address={"0x67bcbc1c0e120d0a700eb38a2d769c20a1dfb8f6"}
          chainId={1}
          className="mx-auto my-4 rounded-xl border-2 border-white shadow-md"
          height={100}
          tokenId={BigInt(3)}
          width={100}
        />
        <LinkComponent
          className="btn btn-light btn-sm mt-4 font-bold"
          href={`/integration/erc1155`}
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
        <IsLightTheme>
          <Image
            alt="Moralis logo"
            height={100}
            src={turboIntegrations.moralis.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Mtarter logo"
            height={100}
            src={turboIntegrations.moralis.imgLight}
            width={100}
          />
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
          <Image
            alt="Aave logo"
            height={100}
            src={turboIntegrations.aave.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Aave logo"
            height={100}
            src={turboIntegrations.aave.imgLight}
            width={100}
          />
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
          <Image
            alt="Arweave logo"
            height={100}
            src={turboIntegrations.arweave.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Arweave logo"
            height={100}
            src={turboIntegrations.arweave.imgLight}
            width={100}
          />
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
          <Image
            alt="Starter logo"
            height={100}
            src={turboIntegrations.starter.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Starter logo"
            height={100}
            src={turboIntegrations.starter.imgLight}
            width={100}
          />
        </IsDarkTheme>
      </div>
    ),
  },
]
>>>>>>> integrations
