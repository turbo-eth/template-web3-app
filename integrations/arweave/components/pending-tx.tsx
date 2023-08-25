import { useEffect, useMemo } from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCheck, FaCopy } from 'react-icons/fa'

import { LinkComponent } from '@/components/shared/link-component'
import { useToast } from '@/lib/hooks/use-toast'

import { Spinner } from './spinner'
import { CONFIRMED_THRESHOLD } from '..'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'
import { AddPendingTxPayload } from '../utils/types'

export const PendingTx = ({ txId, onConfirmation }: AddPendingTxPayload) => {
  const { pendingTxs, addPendingTx } = useArweaveWallet()
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
    addPendingTx({ txId, onConfirmation })
  }, [])

  const pendingTx = useMemo(() => pendingTxs.find((tx) => tx.txId === txId), [pendingTxs])
  const isFinished = (pendingTx?.status?.confirmed?.number_of_confirmations ?? 0) > CONFIRMED_THRESHOLD
  return (
    <div className="card container mt-10 w-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row">
          {!isFinished ? (
            <Spinner />
          ) : (
            <div className="mr-4 flex items-center text-green-800 dark:text-green-400">
              <div>
                <FaCheck />
              </div>
              <span className="ml-2">Confirmed</span>
            </div>
          )}
          <div className="ml-4 flex items-center">
            <span className="rounded-xl bg-slate-100 p-2 font-mono text-sm text-blue-500 dark:bg-slate-600 dark:text-blue-100">{txId}</span>
            <CopyToClipboard text={txId} onCopy={() => handleToast()}>
              <span className="flex-center ml-2 flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                <FaCopy className="text-neutral-600 dark:text-neutral-100" />
              </span>
            </CopyToClipboard>
          </div>
        </div>
        <LinkComponent className="link" href={`/integration/arweave/posts/${txId}`}>
          View tx
        </LinkComponent>
      </div>
    </div>
  )
}
