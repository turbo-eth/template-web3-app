import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface EstimatedAmountArgs {
  isMainnet: boolean
  originDomain: string | undefined
  destinationDomain: string | undefined
  originTokenAddress: string | undefined
  amount: string | undefined
}

interface AxiosResponseData {
  amount: string
  isFastPath: boolean
}

export const useEstimatedAmount = ({
  isMainnet,
  originDomain,
  destinationDomain,
  originTokenAddress,
  amount,
}: EstimatedAmountArgs) => {
  const fetchData = async () => {
    const { data } = await axios.get<AxiosResponseData>(
      `/api/connext/estimated-amount`,
      {
        params: {
          environment: isMainnet ? "mainnet" : "testnet",
          originDomain,
          destinationDomain,
          originTokenAddress,
          amount,
        },
      }
    )
    return data
  }

  const { data: { amount: estimatedAmount, isFastPath } = {}, isLoading } =
    useQuery(
      [
        "estimatedAmount",
        isMainnet,
        originDomain,
        destinationDomain,
        originTokenAddress,
        amount,
      ],
      {
        queryFn: fetchData,
        enabled:
          !!originDomain &&
          !!destinationDomain &&
          !!originTokenAddress &&
          !!amount, // only fetch if all params are truthy
      }
    )

  return {
    estimatedAmount: estimatedAmount || "0",
    isFastPath: isFastPath || false,
    isLoading,
  }
}
