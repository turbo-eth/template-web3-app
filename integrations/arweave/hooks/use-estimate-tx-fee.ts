import { useCallback, useState } from "react"

import { estimateTxFee as estimateTxFeeAPI } from "@/integrations/arweave"

import { ArweaveAmount } from "../utils/types"

export const useEstimateTxFee = () => {
  const [estimatedTxFee, setEstimatedTxFee] = useState<ArweaveAmount | null>(
    null
  )
  const [isEstimatingTxFee, setIsEstimatingTxFee] = useState<boolean>(false)
  const [estimationError, setEstimationError] = useState<string | null>(null)

  const estimateTxFee = useCallback((data: string | ArrayBuffer) => {
    setIsEstimatingTxFee(true)
    estimateTxFeeAPI(data)
      .then((res) => setEstimatedTxFee(res))
      .catch((e) => setEstimationError(e as string))
      .finally(() => setIsEstimatingTxFee(false))
  }, [])

  const reset = useCallback(() => {
    setEstimatedTxFee(null)
    setIsEstimatingTxFee(false)
    setEstimationError(null)
  }, [])

  return {
    estimatedTxFee,
    isEstimatingTxFee,
    estimationError,
    estimateTxFee,
    setIsEstimatingTxFee,
    reset,
  }
}
