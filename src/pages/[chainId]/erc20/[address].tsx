import { ERC20Decimals, ERC20Name, ERC20Symbol, WalletERC20Balance } from '@turbo-eth/erc20-wagmi'
import { useRouter } from 'next/router'

import { Head } from 'components/layout/Head'

export default function Home() {
  const router = useRouter()

  const { address, chainId } = router.query
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center ">
          <div className="card w-[420px] hover:scale-[102%]">
            <h3 className="text-2xl font-normal">
              <ERC20Name chainId={chainId} address={String(address || '')} /> (<ERC20Symbol chainId={chainId} address={String(address || '')} />)
            </h3>
            <div className="mt-3">
              <span className="mr-2 font-bold">Decimals:</span> <ERC20Decimals chainId={chainId} address={String(address || '')} />
            </div>
            <hr className="my-3 dark:opacity-30" />
            <div className="mt-3">
              <span className="mr-2 font-bold">Balance:</span> <WalletERC20Balance chainId={chainId} address={String(address || '')} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
