import { ArweaveAmount } from "../utils/types"
import { Spinner } from "./spinner"

export const FeeEstimation = ({
  estimatedTxFee,
  isEstimatingTxFee,
  estimationError,
}: {
  estimatedTxFee: ArweaveAmount | null
  isEstimatingTxFee: boolean
  estimationError: string | null
}) => (
  <div className="flex items-center text-sm">
    <span className="mr-2 text-muted-foreground">
      Estimated Tx Fee:
    </span>
    {isEstimatingTxFee ? (
      <Spinner isSmall={true} />
    ) : estimationError ? (
      <span className="text-red-500">{estimationError}</span>
    ) : estimatedTxFee ? (
      <span className="font-mono">
        {estimatedTxFee?.ar} AR{" "}
        <span className="text-xs">({estimatedTxFee?.winston} winston) </span>
      </span>
    ) : (
      <span>-</span>
    )}
  </div>
)
