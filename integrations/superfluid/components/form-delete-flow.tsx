'use client'

import { useEffect, useState } from 'react'

import { useAccount, useSigner } from 'wagmi'

import { useSuperFluidWithWagmiProvider } from '../hooks/use-superfluid-with-wagmi-provider'
import { getPerMonthFlowRate } from '../utils/getPerSecondFlowRate'

type Paging = { take: number; skip?: number; lastId?: string }

export default function App() {
  const account = useAccount()
  const signer = useSigner()
  const sf = useSuperFluidWithWagmiProvider()
  const [streams, setStreams] = useState<any[]>()

  useEffect(() => {
    if (!sf) return
    const getStreams = async () => {
      return await sf?.query.listStreams({
        //use wallet address of user, instead of hardcoded address and checksum so it's uppercase
        sender: account.address,
      })
    }

    const streamList = getStreams()
    streamList.then((res) => setStreams(res?.data.filter((stream) => stream.currentFlowRate != '0')))
  }, [sf])

  const onSubmit = async (data: any) => {
    //load the token you'd like to use like this
    //note that tokens may be loaded by symbol or by address
    if (!signer?.data || !account?.address) return
    const usdcx = await sf?.loadSuperToken(data.token.symbol)

    let flowOp = usdcx?.deleteFlow({
      //use wallet address of user, instead of hardcoded address and checksum so it's uppercase
      sender: account.address,
      receiver: data.receiver,
    })

    await flowOp?.exec(signer?.data) // should have same address as sender
  }

  //Make this look good.
  return (
    <div>
      <h3 style={{ marginBottom: '1em' }}>Current Streams</h3>
      {streams?.length ? (
        <div style={{ marginTop: '1em', color: 'black' }}>
          {streams.map((stream, i) => {
            return (
              <div
                key={`stream-${i}`}
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: '2em',
                  marginBottom: '1em',
                }}>
                <p>Current flow rate: {Number(getPerMonthFlowRate(stream.currentFlowRate)).toFixed(0)} / per month</p>
                <p style={{ marginLeft: '1em' }}>Receiver: {stream.receiver}</p>
                <p style={{ marginLeft: '1em' }}>Token: {stream.token.symbol}</p>
                <button style={{ marginLeft: '1em', backgroundColor: 'black', padding: '0.5em', color: 'white' }} onClick={() => onSubmit(stream)}>
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
