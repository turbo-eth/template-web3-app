'use client'

import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'

import { useSuperFluidWithWagmiProvider } from '../hooks/use-superfluid-with-wagmi-provider'

type Paging = { take: number; skip?: number; lastId?: string }

export default function App() {
  const signer = useSigner()
  const { register, handleSubmit } = useForm()
  const [formData, setData] = useState('')
  const sf = useSuperFluidWithWagmiProvider()
  const [streams, setStreams] = useState<any[]>()

  useEffect(() => {
    console.log('got in 1', sf)
    if (!sf) return
    const getStreams = async () => {
      console.log('got in 2', sf)
      return await sf?.query.listStreams({
        sender: '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
      })
    }

    const streamList = getStreams()
    streamList.then((res) => setStreams(res?.data.filter((stream) => stream.currentFlowRate != '0')))
    console.log(streams)
  }, [sf])
  console.log(streams)

  const onSubmit = async (data: any) => {
    //load the token you'd like to use like this
    //note that tokens may be loaded by symbol or by address

    const usdcx = await sf?.loadSuperToken(data.token.symbol)

    let flowOp = usdcx?.deleteFlow({
      sender: '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
      receiver: data.receiver,
    })
    console.log(data, flowOp, usdcx, signer?.data)
    //@ts-ignore
    await flowOp.exec(signer?.data) // should have same address as sender
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1em' }}>Current Streams</h3>
      {streams?.length ? (
        <div>
          {streams.map((stream, i) => {
            return (
              <div
                key={`stream-${i}`}
                style={{ border: '2px solid red', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '2em' }}>
                <p>Current flow rate: {stream.currentFlowRate}</p>
                <p style={{ marginLeft: '1em' }}>Receiver: {stream.receiver}</p>
                <p style={{ marginLeft: '1em' }}>Token: {stream.token.symbol}</p>
                <button style={{ marginLeft: '1em', backgroundColor: 'black', padding: '0.5em' }} onClick={() => onSubmit(stream)}>
                  Stop Stream
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        'No streams'
      )}
    </div>
  )
}
