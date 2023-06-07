'use client'

import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'

import { useSuperFluidWithWagmiProvider } from '../hooks/use-superfluid-with-wagmi-provider'

export default function App() {
  const signer = useSigner()
  const { register, handleSubmit } = useForm()
  const [formData, setData] = useState('')
  const sf = useSuperFluidWithWagmiProvider()

  const onSubmit = async (data: any) => {
    const usdcx = await sf?.loadSuperToken('USDCx')
    //load the token you'd like to use like this
    let flowOp = usdcx?.createFlow({
      sender: '0xc0163e58648b247c143023cfb26c2baa42c9d9a9',
      receiver: '0x1A6784925814a13334190Fd249ae0333B90b6443',
      flowRate: '30000',
    })

    //@ts-ignore
    await flowOp?.exec(signer?.data) // should have same address as `sender`
  }

  return (
    <form onSubmit={handleSubmit((formData) => setData(JSON.stringify(formData)))}>
      <h1>Start Stream</h1>
      <input {...register('receiver')} placeholder="Receiver Address" />
      <select {...register('supertoken', { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <input {...register('flowRate')} placeholder="Flow Rate / month" />
      <p>{formData}</p>
      <button onClick={onSubmit}>Start Stream</button>
    </form>
  )
}
