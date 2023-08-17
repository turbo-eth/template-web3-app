import { useEffect, useState } from 'react'

import { TransactionStatusResponse } from 'arweave/node/transactions'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCheck, FaCopy } from 'react-icons/fa'

import { useToast } from '@/lib/hooks/use-toast'

import { Spinner } from './spinner'
import { getArweaveTxStatus } from '..'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'
import { ArweaveTxId } from '../utils/types'

const CONFIRMED_THRESHOLD = 1

export const TxStatus = ({ txId, onConfirmation }: { txId: ArweaveTxId; onConfirmation?: () => void }) => {
  const [status, setStatus] = useState<TransactionStatusResponse | null>(null)
  const { getBalance } = useArweaveWallet()
  const { toast, dismiss } = useToast()
  const handleToast = () => {
    toast({
      title: 'Arweave Tx ID Copied',
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const txStatus = await getArweaveTxStatus(txId)
      setStatus(txStatus)
      const numberOfConfirmations = txStatus.confirmed?.number_of_confirmations
      if (numberOfConfirmations && numberOfConfirmations > CONFIRMED_THRESHOLD) {
        onConfirmation && onConfirmation()
        getBalance().catch(console.error)
        clearInterval(intervalId)
      }
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])
  const isFinished = (status?.confirmed?.number_of_confirmations ?? 0) > CONFIRMED_THRESHOLD
  return (
    <div className="card container mt-10 w-full">
      <div className="flex flex-col items-center">
        {!isFinished ? (
          <Spinner />
        ) : (
          <div className="flex items-center text-green-800 dark:text-green-400">
            <div>
              <FaCheck />
            </div>
            <span className="ml-2">Confirmed</span>
          </div>
        )}
        <div className="mt-2">
          Tx ID:
          <div className="flex items-center font-mono text-sm">
            {txId}
            <CopyToClipboard text={txId} onCopy={handleToast}>
              <span className="flex-center ml-2 flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                <FaCopy className="text-neutral-600 dark:text-neutral-100" />
              </span>
            </CopyToClipboard>
          </div>
        </div>
        {status?.confirmed && (
          <>
            <div className="mt-2">
              <span className="text-sm">Confirmations:</span>
              <span className="ml-2">{status.confirmed?.number_of_confirmations}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm">Block height:</span>
              <span className="ml-2">{status.confirmed?.block_height}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm">Block Hash:</span>
              <span className="ml-2 font-mono text-xs">{status.confirmed?.block_indep_hash}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
