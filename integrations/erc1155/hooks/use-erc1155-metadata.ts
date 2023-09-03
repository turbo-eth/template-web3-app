import { useQuery } from "wagmi"

import { useErc1155Uri } from "../generated/erc1155-wagmi"
import { ERC1155Props } from "../utils/types"

interface useERC1155MetadataProps
  extends Pick<ERC1155Props, "address" | "chainId"> {
  tokenId: bigint
  ipfsGatewayUrl?: string
}
interface IERC1155Metadata {
  name?: string
  description?: string
  image: string
  symbol?: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
}

/**
 * Hook to retrieve ERC1155 metadata
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
export function useERC1155Metadata({
  address,
  chainId,
  tokenId,
  ipfsGatewayUrl = "https://gateway.ipfs.io",
}: useERC1155MetadataProps) {
  const { data: tokenUriData } = useErc1155Uri({
    address,
    chainId,
    args: [tokenId],
  })

  const metadataQuery = useQuery(
    [address, chainId, "uri", tokenId, tokenUriData],
    {
      queryFn: async () => {
        if (!tokenUriData) throw new Error("No tokenUri found")
        const uri = tokenUriData.replace("ipfs://", "")
        const response = await fetch(`${ipfsGatewayUrl}/${uri}`)

        const json = (await response.json()) as IERC1155Metadata

        if (!json.image) throw new Error("No image found in metadata")
        if (!json.attributes) throw new Error("No attributes found in metadata")

        json.image = json.image.startsWith("ipfs://")
          ? json.image.replace("ipfs://", `${ipfsGatewayUrl}/`)
          : json.image
        return json
      },
      enabled: !!tokenUriData,
    }
  )

  return metadataQuery
}
