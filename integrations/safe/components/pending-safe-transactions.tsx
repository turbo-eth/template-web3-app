'use client'

import { useContext, useEffect, useState } from 'react'

import { SafeMultisigTransactionListResponse } from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { Address } from 'wagmi'

import { useConnectedSafe } from '../hooks/use-connect-safe'
import { Client } from '../safe-client'
import { SafeContext } from '../safe-provider'

export function PendingSafeTransactions() {
  const { safeAddress, safeSdk }: { safeAddress: Address; safeSdk: Safe } = useConnectedSafe()
  const safeClient: Client = useContext(SafeContext) as Client
  const [pendingTxns, setPendingTxns] = useState<SafeMultisigTransactionListResponse | undefined>()

  // TODO: hear for new pending transactions

  useEffect(() => {
    safeClient &&
      safeAddress &&
      safeClient.service
        .getPendingTransactions(safeAddress)
        .then((res) => {
          setPendingTxns(res)
        })
        .catch((error) => console.log(error))
  }, [safeAddress])

  const formatDate = (utcDate: string): string => {
    const localDate = new Date(utcDate)
    return localDate.toLocaleString()
  }

  // TODO: Improve pending txn layout
  return (
    <div className="mb-4">
      {!safeSdk ? (
        <h3>Connect Safe to see pending transactions</h3>
      ) : (
        <>
          <h2 className="mb-4 block text-2xl font-semibold leading-[1.3] text-inherit antialiased">Pending transactions</h2>
          <div className="flex w-full flex-col gap-4">
            {pendingTxns?.count == 0 ? (
              <h3>No pending transactions in this Safe</h3>
            ) : (
              pendingTxns?.results.map((txn) => (
                <div key={txn.nonce} className="card flex w-full gap-4">
                  <div className="flex w-full flex-col gap-2">
                    <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">SafeTxHash</h4>{' '}
                    <span>{txn.safeTxHash.slice(0, 6) + '...' + txn.safeTxHash.slice(-4)}</span>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Nonce</h4> <span>{txn.nonce}</span>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Created</h4>{' '}
                    <span>{formatDate(txn.submissionDate)}</span>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Type</h4>{' '}
                    <span>{txn.data ? 'Contract Call' : 'Send'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
