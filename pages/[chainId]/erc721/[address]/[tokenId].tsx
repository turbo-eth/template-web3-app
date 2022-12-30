import { ERC721Attributes, ERC721Description, ERC721Image, ERC721Name } from '@turbo-eth/erc721-wagmi'
import { useRouter } from 'next/router'

import { Head } from 'components/layout/Head'

export default function Home() {
  const router = useRouter()

  const { address, chainId, tokenId } = router.query
  console.log(tokenId, 'tokenIdtokenId')
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center ">
          <div className="card w-[420px] ">
            <h3 className="mb-3 text-2xl font-normal">
              <ERC721Name chainId={chainId} tokenId={tokenId || '2'} address={String(address || '')} />
            </h3>
            <ERC721Image address={String(address || '2')} tokenId={tokenId || '2'} className="my-4 rounded-xl border-2 border-white shadow-md" />
            <p className="text-xs leading-5">
              <ERC721Description tokenId={tokenId || '2'} address={String(address || '')} />
            </p>
            <hr className="my-4" />
            <ERC721Attributes
              classNameValue="py-1 flex justify-between py-3 font-bold"
              classNameLabel="font-light"
              tokenId={tokenId || '2'}
              address={String(address || '')}
            />
          </div>
        </div>
      </main>
    </>
  )
}
