'use client'

import { useContext, useState } from 'react'

import Safe from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { Address, useAccount } from 'wagmi'

import { useToast } from '@/lib/hooks/use-toast'

import { useConnectedSafe } from '../hooks/useConnectSafe'
import { Client } from '../safe-client'
import { SafeContext } from '../safe-provider'

/**
 * Starter component placeholder. Replace with your own component.
 */
interface sendSafeTransactionForm {
  address: Address
  amount: string
}

export function FormSendSafeTransaction() {
  const { safeAddress, safeSdk }: { safeAddress: Address; safeSdk: Safe } = useConnectedSafe()
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const safeClient: Client = useContext(SafeContext) as Client
  const { register, handleSubmit } = useForm<sendSafeTransactionForm>()
  const { toast, dismiss } = useToast()

  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }

  async function onSubmit(FieldValues: sendSafeTransactionForm) {
    setIsLoading(true)
    const decimals = 18
    const value = ethers.utils.parseUnits(FieldValues.amount, decimals).toString()
    const nonce = await safeClient.service.getNextNonce(safeAddress)
    const safeTransactionData: SafeTransactionDataPartial = {
      to: FieldValues.address,
      data: '0x',
      value,
      nonce,
    }
    // Create txn
    const safeTransaction = await safeSdk.createTransaction({ safeTransactionData })
    // Get txn hash
    const safeTransactionHash = await safeSdk.getTransactionHash(safeTransaction)
    // Sign txn
    const ownerSignature = await safeSdk.signTransactionHash(safeTransactionHash)
    // Propose txn
    if (address) {
      try {
        await safeClient.service.proposeTransaction({
          safeAddress: safeAddress,
          safeTransactionData: safeTransaction.data,
          safeTxHash: safeTransactionHash,
          senderAddress: address.toString(),
          senderSignature: ownerSignature.data,
        })
        handleToast({
          title: 'Transaction proposal created',
          description: `Txn ${safeTransactionHash} created, visit Safe App to execute`,
        })
      } catch (error) {
        console.log(error)
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="card w-full">
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <p>Create a send transaction.</p>
        <label>Receiver Address</label>
        <input required className="input mt-4" placeholder="Insert address" {...register('address')} />
        <label>Amount</label>
        <input required className="input mt-4" {...register('amount')} />
        <button className="btn btn-emerald mt-4 w-full" disabled={false} type="submit">
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
