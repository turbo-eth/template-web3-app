import React, { Dispatch, SetStateAction, useState } from 'react'

import { useForm } from 'react-hook-form'
import { FaChevronDown, FaPlus } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { addOwnerForm } from './manage-safe'

const AddOwnerDialog = ({
  ownersAmount,
  isLoading,
  open,
  setOpen,
  onSubmit,
}: {
  ownersAmount: number
  isLoading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onSubmit: (FieldValues: addOwnerForm, newThreshold: number | undefined) => Promise<void>
}) => {
  const { register, handleSubmit } = useForm<addOwnerForm>()
  const [newThreshold, setNewThreshold] = useState<number | undefined>(undefined)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn btn-emerald mt-4 w-full" disabled={false}>
          {isLoading ? (
            'Adding owner...'
          ) : (
            <div className="flex justify-center">
              <FaPlus />
              <span className="px-1">Add new owner</span>
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Owner</DialogTitle>
        <DialogDescription>Provide new owner&lsquo;s address and set new treshold</DialogDescription>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit((fieldValues) => onSubmit(fieldValues, newThreshold))}>
          <fieldset>
            <Label>Address</Label>
            <Input required className="mt-4" {...register('newOwner')} />
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
                {[...Array(ownersAmount + 1).keys()].map((num) => {
                  return (
                    <DropdownMenuItem key={num + 1} onClick={() => setNewThreshold(num + 1)}>
                      <span>{num + 1}</span>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </fieldset>
          <Button className="btn btn-emerald mt-4 w-full" disabled={false}>
            {isLoading ? 'Adding owner...' : <span className="px-1">Add owner</span>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddOwnerDialog
