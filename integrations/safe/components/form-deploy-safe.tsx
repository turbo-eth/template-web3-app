'use client'

import { useContext, useState } from 'react'

import Safe, { SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit'
import { useForm } from 'react-hook-form'
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa'

import { useEthersSigner } from '@/lib/hooks/web3/use-ethers-signer'

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

export function FormDeploySafe() {
  const safeOwner = useEthersSigner()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [safeSdk, setSafeSdk] = useState<Safe>()
  const { factory }: { factory: SafeFactory } = useContext(SafeContext) as Client
  const { register, handleSubmit } = useForm<deploySafeForm>()
  const [loadedOwners, setLoadedOwners] = useState<object[]>([])

  // useEffect(() => {
  //   // if (safeClient) safeClient.factory.deploySafe({ safeAccountConfig }).then((sdk) => setSafeSdk(sdk))
  //   if (safeOwner != undefined) setLoadedOwners([safeOwner._address])
  // }, [safeOwner])

  function onSubmit(FieldValues: deploySafeForm) {
    setIsLoading(true)
    if (factory != undefined && FieldValues.owners != undefined && FieldValues.threshold != undefined) {
      const safeAccountConfig: SafeAccountConfig = {
        owners: [safeOwner, loadedOwners], // ['0x<address>', '0x<address>', '0x<address>']
        threshold: FieldValues.threshold,
      }
      // factory
      //   .deploySafe({ safeAccountConfig })
      //   .then((sdk) => {
      //     setSafeSdk(sdk)
      //     console.log(safeSdk)
      //   })
      //   .catch((error) => console.error({ error }))
      console.log(safeAccountConfig)
      setIsLoading(false)
    }
  }

  const addBtnClick = (e) => {
    e.preventDefault()
    setLoadedOwners([...loadedOwners, { index: loadedOwners.length, value: '' }])
  }

  const handleChange = (e, index) => {
    const values = [...loadedOwners]
    values[index].value = e.target.value
    setLoadedOwners(values)
  }

  const handleDelete = (e, index) => {
    const values = loadedOwners.filter((item) => item.index !== index)
    const newValues = values.map((val, index) => {
      console.log(val.index, index)
      val.index = index
      return val
    })
    setLoadedOwners([...newValues])
  }

  console.log(loadedOwners)

  // After onsubmit execution we have the safeSdk created

  return (
    <div className="card w-full">
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <p>Set the owner wallets of your Safe Account and how many need to confirm to execute a valid transaction.</p>
        <div className="mt-8 flex flex-col justify-center gap-x-14 text-2xl sm:flex-col">
          <span>Owners:</span>
          <input
            required
            className="input mt-4"
            placeholder="Insert address"
            value={safeOwner ? safeOwner._address : null}
            {...register('address')}
          />
          {loadedOwners.length > 0
            ? loadedOwners.map((owner) => (
                <div key={owner.index} className="flex">
                  <input required className="input mr-2 mt-4" placeholder="Address" onChange={(e) => handleChange(e, owner.index)} />
                  <button className="btn btn-sm btn-red mt-4" disabled={false} onClick={(e) => handleDelete(e, owner.index)}>
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))
            : null}
        </div>
        <button className="btn btn-blue mt-4 w-full" disabled={false} onClick={addBtnClick}>
          {isLoading ? (
            'Loading...'
          ) : (
            <div className="flex justify-center">
              <FaPlus />
              <span className="px-1">Add new owner</span>
            </div>
          )}
        </button>
        <label>Threshold</label>
        <input required className="input mt-4" {...register('threshold')} />
        <button className="btn btn-emerald mt-4 w-full" disabled={false} type="submit">
          {isLoading ? 'Loading...' : 'Create Safe'}
        </button>
      </form>
    </div>
  )
}
