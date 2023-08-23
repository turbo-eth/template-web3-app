'use client'

import { useContext, useEffect, useState } from 'react'

import { SafeInfoResponse } from '@safe-global/api-kit'
import Safe, { AddOwnerTxParams, RemoveOwnerTxParams } from '@safe-global/protocol-kit'
import { Address } from 'wagmi'

import { BlockExplorerLink } from '@/components/blockchain/block-explorer-link'
import { useToast } from '@/lib/hooks/use-toast'

import AddOwnerDialog from './add-owner-dialog'
import DeleteOwner from './delete-owner'
import { useConnectedSafe } from '../hooks/useConnectSafe'
import { Client } from '../safe-client'
import { SafeContext } from '../safe-provider'

export interface addOwnerForm {
  newOwner: string
}

export function ManageSafe() {
  const { safeAddress, safeSdk }: { safeAddress: Address; safeSdk: Safe } = useConnectedSafe()
  const safeClient: Client = useContext(SafeContext) as Client
  const [safeInfo, setSafeInfo] = useState<SafeInfoResponse | undefined>()
  const [owners, setOwners] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast, dismiss } = useToast()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  useEffect(() => {
    safeClient &&
      safeAddress &&
      safeClient.service
        .getSafeInfo(safeAddress)
        .then((res) => {
          setSafeInfo(res)
          setOwners(res.owners)
        })
        .catch((error) => console.log(error))
  }, [safeAddress])

  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }

  const onSubmitDelete = async (ownerToDelete: string, newThreshold: number | undefined) => {
    setIsLoading(true)
    const params: RemoveOwnerTxParams = {
      ownerAddress: ownerToDelete,
      threshold: newThreshold, // Optional. If `newThreshold` is not provided, the current threshold will be decreased by one.
    }
    // TODO: fix threshold needs to be greater than 0
    const safeTransaction = await safeSdk.createRemoveOwnerTx(params)
    const txResponse = await safeSdk.executeTransaction(safeTransaction)
    await txResponse.transactionResponse?.wait()
    console.log(txResponse)
    setIsLoading(false)
    handleToast({
      title: 'Transaction created',
      description: 'Owner will be removed after txn gets executed',
    })
    const safeInfo = await safeClient.service.getSafeInfo(safeAddress)
    setSafeInfo(safeInfo)
    setOwners(safeInfo.owners)
    setOpenDeleteDialog(false)
  }

  const onSubmitAddOwner = async (FieldValues: addOwnerForm, newThreshold: number | undefined) => {
    setIsLoading(true)
    const params: AddOwnerTxParams = {
      ownerAddress: FieldValues.newOwner,
      threshold: newThreshold, // Optional. If `threshold` is not provided the current threshold will not change.
    }
    const safeTransaction = await safeSdk.createAddOwnerTx(params)
    const txResponse = await safeSdk.executeTransaction(safeTransaction)
    await txResponse.transactionResponse?.wait()
    console.log(txResponse)
    setIsLoading(false)
    handleToast({
      title: 'Transaction created',
      description: 'Owner will be added after txn gets executed',
    })
    const safeInfo = await safeClient.service.getSafeInfo(safeAddress)
    setSafeInfo(safeInfo)
    setOwners(safeInfo.owners)
    setOpenAddDialog(false)
  }

  return (
    <div className="mb-4">
      {!safeSdk ? null : (
        <>
          <div className="card flex w-full flex-col gap-4">
            <h3 className="mb-4 block text-2xl font-semibold leading-[1.3] text-inherit antialiased">Manage Safe</h3>
            <div className="mb-4 flex justify-between">
              <div className="flex flex-col gap-2">
                <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Address</h4>
                <BlockExplorerLink address={safeAddress} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Treshold</h4> <span>{safeInfo?.threshold}</span>
              </div>
            </div>
            <DeleteOwner
              isLoading={isLoading}
              open={openDeleteDialog}
              owners={owners}
              ownersAmount={owners.length}
              setOpen={setOpenDeleteDialog}
              onSubmit={onSubmitDelete}
            />
            <AddOwnerDialog
              isLoading={isLoading}
              open={openAddDialog}
              ownersAmount={owners.length}
              setOpen={setOpenAddDialog}
              onSubmit={onSubmitAddOwner}
            />
          </div>
        </>
      )}
    </div>
  )
}
