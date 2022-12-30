import Link from 'next/link'

import { Head } from 'components/layout/Head'
import { SITE_DESCRIPTION, SITE_EMOJI, SITE_NAME } from 'utils/config'
import erc20TokenSymbolToAddress from 'utils/erc20TokenSymbolToAddress'

export default function Home() {
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <h3 className="text-6xl font-normal">{SITE_EMOJI}</h3>
          <h3 className="text-5xl font-bold">{SITE_NAME}</h3>

          <h5 className="my-4 text-lg">{SITE_DESCRIPTION}</h5>
          <div className="container mx-auto mt-10 flex max-w-screen-xl items-center gap-6 text-left">
            <div className="card w-1/3">
              <h3 className="text-2xl font-semibold">Account</h3>
              <p className="">Core Network/Wallet components and hooks</p>
              <Link className="btn btn-light btn-sm mt-4 font-bold" href={`/account`}>
                Example
              </Link>
            </div>
            <div className="card w-1/3">
              <h3 className="text-2xl font-semibold">ERC20</h3>
              <p className="">ERC20 WAGMI components and hooks</p>
              <Link className="btn btn-light btn-sm mt-4 font-bold" href={`/1/erc20/${erc20TokenSymbolToAddress.USDC}`}>
                Example
              </Link>
            </div>
            <div className="card w-1/3">
              <h3 className="text-2xl font-semibold">ERC721</h3>
              <p className="">ERC721 WAGMI components and hooks</p>
              <Link className="btn btn-light btn-sm mt-4 font-bold" href={`/1/erc721/0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8/10`}>
                Example
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
