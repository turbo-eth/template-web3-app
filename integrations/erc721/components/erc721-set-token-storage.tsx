import { FormEvent, useEffect, useMemo, useState } from "react"
import { Address, isAddress } from "viem"

import { useErc721TokenStorage } from "../hooks/use-erc721-token-storage"

export function Erc721SetTokenStorage() {
  const [token, setToken] = useErc721TokenStorage()
  const [tokenAddress, setTokenAddress] = useState<Address>()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setToken(tokenAddress)
  }

  const isValidAddress = useMemo(
    () => tokenAddress && isAddress(tokenAddress),
    [tokenAddress]
  )

  useEffect(() => {
    setTokenAddress(token)
  }, [token])

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label>Selected Contract Address</label>
        <input
          className="input"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value as Address)}
        />
        <button
          className="btn btn-emerald disabled:opacity-60"
          disabled={!isValidAddress}
          type="submit"
        >
          {"Select Contract Address"}
        </button>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Select ERC721 Contract</h3>
          <p className="text-center text-sm text-gray-500">
            Select which NFT contract to interact with
          </p>
        </div>
      </form>
    </div>
  )
}
