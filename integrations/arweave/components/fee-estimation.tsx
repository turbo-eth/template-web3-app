import { Spinner } from './spinner'
import { ArweaveAmount } from '../utils/types'

export const FeeEstimation = ({
  estimatedTxFee,
  isEstimatingTxFee,
  estimationError,
}: {
  estimatedTxFee: ArweaveAmount | null
  isEstimatingTxFee: boolean
  estimationError: string | null
}) => (
  <div className="flex items-center">
    <span className="mr-2 text-slate-200">Estimated Tx Fee:</span>
    {isEstimatingTxFee ? (
      <Spinner isSmall={true} />
    ) : estimationError ? (
      <span className="text-red-500">{estimationError}</span>
    ) : estimatedTxFee ? (
      <span className="font-mono">
        {estimatedTxFee?.ar} AR <span className="text-xs">({estimatedTxFee?.winston} winston) </span>
      </span>
    ) : (
      <span>-</span>
    )}
  </div>
)
