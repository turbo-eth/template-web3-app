'use client'

import { useState } from 'react'

import { useForm } from 'react-hook-form'

export default function App() {
  const onSubmit = (data: any) => console.log(data)

  /* useEffect(() => {
    const setSF = async () => {
      const sf = await Framework.create({
        chainId: 1,
        provider: provider, // this is the injected provider
      })
      console.log(sf)
    }
    setSF()
  }, []) */

  const { register, handleSubmit } = useForm()
  const [data, setData] = useState('')

  return (
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <h1>Start Stream</h1>
      <input {...register('receiver')} placeholder="Receiver Address" />
      <select {...register('supertoken', { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <input {...register('flowRate')} placeholder="Flow Rate / month" />
      <p>{data}</p>
      <input type="submit" />
    </form>
  )
}
