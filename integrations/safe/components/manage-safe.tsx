'use client'

import { useContext, useEffect, useState } from 'react'

import { SafeInfoResponse } from '@safe-global/api-kit'
import Safe, { AddOwnerTxParams, RemoveOwnerTxParams } from '@safe-global/protocol-kit'
import { FaChevronDown, FaRegTrashAlt } from 'react-icons/fa'
import { Address } from 'wagmi'

import { BlockExplorerLink } from '@/components/blockchain/block-explorer-link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import AddOwnerDialog from './add-owner-dialog'
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
  const [ownerToDelete, setOwnerToDelete] = useState<Address | string>('')
  const [newThreshold, setNewThreshold] = useState<number | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const handleDelete = (owner: string) => {
    setOwnerToDelete(owner)
    setNewThreshold(undefined)
  }

  const onDeleteSubmit = async () => {
    setIsLoading(true)
    const params: RemoveOwnerTxParams = {
      ownerAddress: ownerToDelete,
      threshold: newThreshold, // Optional. If `newThreshold` is not provided, the current threshold will be decreased by one.
    }
    const safeTransaction = await safeSdk.createRemoveOwnerTx(params)
    const txResponse = await safeSdk.executeTransaction(safeTransaction)
    await txResponse.transactionResponse?.wait()
    setIsLoading(false)
  }

  const onSubmitAddOwner = async (FieldValues: addOwnerForm) => {
    console.log(FieldValues)
    console.log(newThreshold)
    const params: AddOwnerTxParams = {
      ownerAddress: FieldValues.newOwner,
      threshold: newThreshold, // Optional. If `threshold` is not provided the current threshold will not change.
    }
    const safeTransaction = await safeSdk.createAddOwnerTx(params)
    const txResponse = await safeSdk.executeTransaction(safeTransaction)
    await txResponse.transactionResponse?.wait()
    // TODO: toast or something indicating txn creation
    // TODO: close dialog
  }

  // TODO: extract delete owner dialog to another file

  return (
    <div className="mb-4">
      {!safeSdk ? null : (
        <>
          <Dialog>
            <div className="card flex w-full flex-col gap-4">
              <h3 className="mb-4 block text-2xl font-semibold leading-[1.3] text-inherit antialiased">Manage Safe</h3>
              <div className="mb-4 flex justify-between">
                <div className="flex flex-col gap-2">
                  <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Address</h4>
                  <BlockExplorerLink address={safeAddress} />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Treshold</h4>{' '}
                  <span>{safeInfo?.threshold}</span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Owners</h4>
                {owners.map((owner) => (
                  <div key={owner} className="mb-4 flex justify-between">
                    <h5>{owner}</h5>
                    {owners.length <= 1 ? null : (
                      <DialogTrigger asChild>
                        <button className="text-red-500" onClick={() => handleDelete(owner)}>
                          <FaRegTrashAlt />
                        </button>
                      </DialogTrigger>
                    )}
                  </div>
                ))}
              </div>
              <DialogContent>
                <DialogTitle>Delete Owner</DialogTitle>
                <DialogDescription>Confirm owner delete and set new treshold</DialogDescription>
                <fieldset>
                  <Label>Address</Label>
                  <Input readOnly required className="mt-4" value={ownerToDelete} />
                </fieldset>
                <fieldset>
                  <Label>New Treshold</Label>
                  <DropdownMenu>
                    <div className="mt-4 flex justify-between">
                      <Input placeholder="Select value" value={newThreshold} />
                      <DropdownMenuTrigger asChild>
                        <Button>
                          <FaChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent forceMount align="center">
                      {[...Array(owners.length).keys()]
                        .filter((num) => num !== 0)
                        .map((num) => {
                          return (
                            <DropdownMenuItem key={num} onClick={() => setNewThreshold(num)}>
                              <span>{num}</span>
                            </DropdownMenuItem>
                          )
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </fieldset>
                <Button className="btn btn-emerald mt-4 w-full" disabled={false} onClick={onDeleteSubmit}>
                  {isLoading ? 'Deleting owner...' : <span className="px-1">Delete owner</span>}
                </Button>
              </DialogContent>

              {/* <Button className="btn btn-emerald mt-4 w-full" disabled={false} onClick={addBtnClick}>
                  {isLoading ? (
                    'Adding owner...'
                  ) : (
                    <div className="flex justify-center">
                      <FaPlus />
                      <span className="px-1">Add new owner</span>
                    </div>
                  )}
                </Button> */}
            </div>
          </Dialog>
          <AddOwnerDialog isLoading={isLoading} ownersAmount={owners.length} onSubmit={onSubmitAddOwner} />
        </>
      )}
    </div>
  )
}
