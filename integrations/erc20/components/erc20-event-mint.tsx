/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

import { BigNumberish, constants, utils } from 'ethers'
import { useContractEvent, useToken } from 'wagmi'

import { erc20ABI } from '../erc20-wagmi'
import { useTokenStorage } from '../use-token-storage'

export default function ERC20EventMint() {
  const [token] = useTokenStorage()
  const [event, setEvent] = useState<{
    from: string
    to: string
    amount: BigNumberish
  }>()

  useContractEvent({
    address: token,
    abi: erc20ABI,
    eventName: 'Transfer',
    listener(from, to, amount) {
      if (from == constants.AddressZero) {
        setEvent({
          from,
          to,
          amount,
        })
      }
    },
  })

  if (!token) return null
  if (!event) return null

  return (
    <div className="content py-6">
      {!event?.to ? null : (
        <>
          <p className="">From: {event?.from}</p>
          <p className="">To: {event?.to}</p>
          <p className="">Amount: {utils.formatEther(event?.amount.toString() || '0')}</p>
        </>
      )}
    </div>
  )
}
