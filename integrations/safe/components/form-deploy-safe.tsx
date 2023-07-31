'use client'

import { useContext, useState } from 'react'

import Safe, { SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit'
import { useForm } from 'react-hook-form'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [safeSdk, setSafeSdk] = useState<Safe>()
  const { factory }: { factory: SafeFactory } = useContext(SafeContext) as Client
  const { register, handleSubmit } = useForm<deploySafeForm>()

  // useEffect(() => {
  //   if (safeClient) safeClient.factory.deploySafe({ safeAccountConfig }).then((sdk) => setSafeSdk(sdk))
  // }, [safeSdk])

  function onSubmit(FieldValues: deploySafeForm) {
    setIsLoading(true)
    if (factory != undefined && FieldValues.owners != undefined && FieldValues.threshold != undefined) {
      const safeAccountConfig: SafeAccountConfig = {
        owners: FieldValues.owners, // ['0x<address>', '0x<address>', '0x<address>']
        threshold: FieldValues.threshold,
      }
      factory
        .deploySafe({ safeAccountConfig })
        .then((sdk) => {
          setSafeSdk(sdk)
          console.log(safeSdk)
        })
        .catch((error) => console.error({ error }))
    }
  }

  // After onsubmit execution we have the safeSdk created

  return (
    <div className="card w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Owners</label>
        <input required className="input mt-4" {...register('owners')} />
        <label>Threshold</label>
        <input required className="input mt-4" {...register('threshold')} />
        <button className="btn btn-emerald mt-4 w-full" disabled={false} type="submit">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
