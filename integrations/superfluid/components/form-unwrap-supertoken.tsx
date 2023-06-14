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
  //use zod to validate form inputs
  //make this stuff dynamic, remove console logs and ts ignores if possible
  async function downgradeTokens(amount: string) {
    console.log(formData)
    if (!sf) return
    //@ts-ignore
    const superSigner = sf.createSigner({ signer: signer })

    const usdcx = await sf.loadSuperToken('USDCx')

    try {
      //@ts-ignore
      const downgradeOperation = usdcx?.downgrade({
        amount: amount,
      })

      console.log('downgrading...', usdcx, downgradeOperation)
      await downgradeOperation.exec(signer?.data)
      console.log(
        `Congrats - you've just downgraded your tokens
           Network: Goerli
           Super Token: DAIx
           Amount: ${amount}         
        `
      )

      console.log(
        `Congrats - you've just downgraded
      `
      )
    } catch (error) {
      console.log(
        amount,
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      )
      console.error(error)
    }
  }

  const onSubmit = async (data: any) => {
    downgradeTokens(`10000000000`)
  }

  //use react-hook-form for the form
  return (
    <form onSubmit={handleSubmit((formData) => setData(JSON.stringify(formData)))}>
      <h1>Downgrade Supertoken</h1>
      <input {...register('amount')} placeholder="Amount" />
      <select {...register('supertoken', { required: true })}>
        <option value="">Select...</option>
        <option value="USDCx">USDCx</option>
        <option value="DAIx">DAIx</option>
      </select>
      <div>
        <p>0.0</p>
        <div>Token Name</div>
      </div>
      <p>{formData}</p>
      <button onClick={onSubmit}>Downgrade</button>
    </form>
  )
}
