import { FormEvent, useEffect, useMemo, useState } from "react"
import { Address, isAddress } from "viem"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { useErc1155TokenStorage } from "../hooks/use-erc1155-token-storage"

export function Erc1155SetTokenStorage() {
  const [token, setToken] = useErc1155TokenStorage()
  const [tokenAddress, setTokenAddress] = useState<Address>()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    <Card>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <label>Selected Contract Address</label>
          <input
            className="input"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value as Address)}
          />
          <Button disabled={!isValidAddress} type="submit">
            Select Contract Address
          </Button>
        </form>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="justify-between">
        <h3 className="text-center">Select ERC1155 Contract</h3>
        <p className="text-center text-sm text-gray-500">
          Select which NFT contract to interact with
        </p>
      </CardFooter>
    </Card>
  )
}
