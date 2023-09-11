import { FormEvent, useEffect, useMemo, useState } from "react"
import { Address, isAddress } from "viem"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { useErc721TokenStorage } from "../hooks/use-erc721-token-storage"

export function Erc721SetTokenStorage() {
  const [token, setToken] = useErc721TokenStorage()
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
          <Button variant="emerald" disabled={!isValidAddress} type="submit">
            {"Select Contract Address"}
          </Button>
        </form>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="justify-between">
        <h3 className="text-center">Select ERC721 Contract</h3>
        <p className="text-center text-sm text-muted-foreground">
          Select which NFT contract to interact with
        </p>
      </CardFooter>
    </Card>
  )
}
