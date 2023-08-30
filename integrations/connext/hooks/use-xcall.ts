import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { TransactionRequest } from "viem"
import { useAccount } from "wagmi"

interface XCallArgs {
  isMainnet: boolean
  origin: string | undefined
  destination: string | undefined
  to: string | undefined
  asset: string | undefined
  amount: string | undefined
  relayerFee: string | undefined
}

interface AxiosResponseData {
  txRequest: TransactionRequest
}

interface IXCall {
  request: TransactionRequest | undefined
  isLoading: boolean
}

export const useXcall = ({
  isMainnet,
  origin,
  destination,
  to,
  asset,
  amount,
  relayerFee,
}: XCallArgs): IXCall => {
  const { address } = useAccount()

  const { data, isLoading } = useQuery<TransactionRequest, Error>(
    [
      "xcall",
      isMainnet,
      origin,
      destination,
      to,
      asset,
      amount,
      relayerFee,
      address,
    ],
    {
      queryFn: async () => {
        const response = await axios.post<AxiosResponseData>(
          `/api/connext/xcall`,
          {
            environment: isMainnet ? "mainnet" : "testnet",
            origin,
            destination,
            to,
            asset,
            amount,
            signer: address,
            relayerFee,
            slippage: "300",
          }
        )
        return response.data.txRequest
      },
      enabled:
        !!origin &&
        !!destination &&
        !!to &&
        !!asset &&
        !!amount &&
        relayerFee !== "0",
    }
  )

  return { request: data, isLoading }
}
