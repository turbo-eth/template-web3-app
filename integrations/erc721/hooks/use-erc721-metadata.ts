import { BigNumber } from 'ethers'
import { useQuery } from 'wagmi'

import { useErc721TokenUri } from '../erc721-wagmi'
import { ERC721Props } from '../utils/types'

interface useERC721MetadataProps extends Pick<ERC721Props, 'address' | 'chainId'> {
  tokenId?: number
  ipfsGatewayUrl?: string
}
interface IERC721Metadata {
  name?: string
  description?: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
}

/**
 * Hook to retrieve ERC721 metadata
 * uses the tokenURI to retrieve the metadata from IPFS
 * @param address - NFT contract address
 * @param chainId - NFT contract chainId
 * @param tokenId - NFT tokenId
 * @param ipfsGatewayUrl - Optional IPFS gateway url to retrieve the metadata default: https://cloudflare-ipfs.com/ipfs
 * if adding a custom gateway make sure to add the domain at `next.config.js` image domains
 * @throws Will throw an error if no tokenUri is found
 * @throws Will throw an error if no image or attributes are found in the metadata
 * @returns metadataQuery - Query object with the metadata
 */
export function useERC721Metadata({ address, chainId, tokenId, ipfsGatewayUrl = 'https://cloudflare-ipfs.com/ipfs' }: useERC721MetadataProps) {
  const { data: tokenUriData } = useErc721TokenUri({
    address,
    chainId,
    args: [BigNumber.from(tokenId)],
  })

  const metadataQuery = useQuery([address, chainId, 'tokenUri', tokenId, tokenUriData], {
    queryFn: async () => {
      if (!tokenUriData) throw new Error('No tokenUri found')
      const uri = tokenUriData.replace('ipfs://', '')
      const response = await fetch(`${ipfsGatewayUrl}/${uri}`)
      const json = (await response.json()) as IERC721Metadata

      if (!json.image) throw new Error('No image found in metadata')
      if (!json.attributes) throw new Error('No attributes found in metadata')

      json.image = json.image.startsWith('ipfs://') ? json.image.replace('ipfs://', `${ipfsGatewayUrl}/`) : json.image
      return json
    },
    enabled: !!tokenUriData,
  })

  return metadataQuery
}
