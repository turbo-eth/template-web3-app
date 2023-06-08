import { FormEvent, useEffect, useMemo, useState } from 'react'

import { Address, isAddress } from 'viem'

import { useERC20TokenStorage } from '../hooks/use-erc20-token-storage'

export function Erc20SetTokenStorage() {
  const [token, setToken] = useERC20TokenStorage()
  const [tokenAddress, setTokenAddress] = useState(token)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setToken(tokenAddress)
  }

  const isValidAddress = useMemo(() => tokenAddress && isAddress(tokenAddress), [tokenAddress])

  useEffect(() => {
    setTokenAddress(token)
  }, [token])

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label>Selected Contract Address</label>
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value as Address)} className="input" />
        <button type="submit" disabled={!isValidAddress} className="btn btn-emerald">
          {'Select Contract Address'}
        </button>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Select ERC20 Contract</h3>
          <p className="text-center text-sm text-gray-500">Select which ERC20 contract to interact with</p>
        </div>
      </form>
    </div>
  )
}
