import React, { Dispatch, SetStateAction, useState } from 'react'

import { FaChevronDown, FaRegTrashAlt } from 'react-icons/fa'
import { Address } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const DeleteOwner = ({
  owners,
  ownersAmount,
  isLoading,
  open,
  setOpen,
  onSubmit,
}: {
  owners: string[]
  ownersAmount: number
  isLoading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onSubmit: (ownerToDelete: string, newThreshold: number | undefined) => Promise<void>
}) => {
  const [newThreshold, setNewThreshold] = useState<number | undefined>(undefined)
  const [ownerToDelete, setOwnerToDelete] = useState<Address | string>('')

  const handleDelete = (owner: string) => {
    setOwnerToDelete(owner)
    setNewThreshold(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex w-full flex-col gap-2">
        <h4 className="block text-base font-semibold leading-[1.3] text-inherit antialiased">Owners</h4>
        {owners.map((owner) => (
          <div key={owner} className="mb-4 flex justify-between">
            <h5>{owner}</h5>
            {ownersAmount <= 1 ? null : (
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
              {[...Array(ownersAmount).keys()]
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
        <Button className="btn btn-emerald mt-4 w-full" disabled={false} onClick={() => onSubmit(ownerToDelete, newThreshold)}>
          {isLoading ? 'Deleting owner...' : <span className="px-1">Delete owner</span>}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteOwner
