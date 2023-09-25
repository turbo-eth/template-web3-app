'use client'

import { useContext, useState } from 'react'

import { SafeAccountConfig } from '@safe-global/protocol-kit'
import { useForm } from 'react-hook-form'
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { Address, useAccount, usePublicClient, useQuery } from 'wagmi'

import { BlockExplorerLink } from '@/components/blockchain/block-explorer-link'
import { useToast } from '@/lib/hooks/use-toast'

import { Client } from '../safe-client'
import { SafeContext } from '../safe-provider'

/**
 * Starter component placeholder. Replace with your own component.
 */
interface deploySafeForm {
  owners: string[]
  threshold: number
  safeAccountConfig: SafeAccountConfig
}

interface owner {
  index: number
  value: string
}

export function FormDeploySafe() {
  const publicClient = usePublicClient()
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const safeClient: Client = useContext(SafeContext) as Client
  const { register, handleSubmit } = useForm<deploySafeForm>()
  const [loadedOwners, setLoadedOwners] = useState<owner[]>([])
  const [safeAddress, setSafeAddress] = useState<Address>('0x')
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

  const { data: nonce } = useQuery(['wallet-nonce', address, publicClient], {
    queryFn: async () => {
      if (!publicClient || !address) return
      return await publicClient.getTransactionCount({
        address,
      })
    },
    enabled: !!address && !!publicClient,
  })

  function onSubmit(FieldValues: deploySafeForm) {
    setIsLoading(true)
    if (safeClient.factory != undefined && FieldValues.threshold != undefined && address != undefined) {
      const safeAccountConfig: SafeAccountConfig = {
        owners: [address, ...loadedOwners.map((owner) => owner.value)], // ['0x<address>', '0x<address>', '0x<address>']
        threshold: FieldValues.threshold,
      }
      safeClient.factory
        .deploySafe({ safeAccountConfig, saltNonce: nonce?.toString() })
        .then(async (safe) => {
          const addr: Address = (await safe.getAddress()) as Address
          setSafeAddress(addr)
          handleToast({
            title: 'New Safe created',
            description: 'Click on contract address to explore new Safe.',
          })
        })
        .catch((error) => {
          console.log(error)
          handleToast({
            title: 'An Error Occurred',
            description: 'Error when trying to create a new Safe. Try again later.',
          })
        })
      setIsLoading(false)
    }
    // TODO: handle errors in the form on submit
  }

  const addBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setLoadedOwners([...loadedOwners, { index: loadedOwners.length, value: '' }])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const values: owner[] = [...loadedOwners]
    values[index].value = e.target.value
    setLoadedOwners(values)
  }

  const handleDelete = (index: number) => {
    const values = loadedOwners.filter((item) => item.index !== index)
    const newValues = values.map((val, index) => {
      val.index = index
      return val
    })
    setLoadedOwners([...newValues])
  }

  return (
    <div className="card w-full">
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <p>Set the owner wallets of your Safe Account and how many need to confirm to execute a valid transaction.</p>
        <div className="mt-8 flex flex-col justify-center gap-x-14 text-2xl sm:flex-col">
          <span>Owners:</span>
          <input readOnly required className="input mt-4" placeholder="Insert address" value={address} />
          {loadedOwners.length > 0 ? (
            loadedOwners.map((owner) => (
              <div key={owner.index} className="flex">
                <input
                  required
                  className="input mr-2 mt-4"
                  placeholder="Address"
                  value={owner.value || ''}
                  onChange={(e) => handleChange(e, owner.index)}
                />
                <button className="btn btn-sm btn-red mt-4" onClick={() => handleDelete(owner.index)}>
                  <FaRegTrashAlt />
                </button>
              </div>
            ))
          ) : (
            <div />
          )}
        </div>
        <button className="btn btn-blue mt-4 w-full" disabled={false} onClick={addBtnClick}>
          <div className="flex justify-center">
            <FaPlus />
            <span className="px-1">Add new owner</span>
          </div>
        </button>
        <label>Threshold</label>
        <input required className="input mt-4" {...register('threshold')} />
        <button className="btn btn-emerald mt-4 w-full" disabled={false} type="submit">
          {isLoading ? 'Creating Safe...' : 'Create Safe'}
        </button>
      </form>
      {safeAddress.length > 2 ? (
        <div className="flex max-w-full flex-wrap items-center justify-between break-words pb-2 pt-5">
          <span className="font-semibold">Contract Address:</span>
          <BlockExplorerLink address={safeAddress} />
        </div>
      ) : null}
    </div>
  )
}
