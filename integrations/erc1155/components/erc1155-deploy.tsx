import { FormEvent, useState } from "react"
import { usePublicClient, useWalletClient } from "wagmi"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BlockExplorerLink } from "@/components/blockchain/block-explorer-link"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"

import { erc1155ABI } from "../artifacts/core/erc1155-abi"
import { erc1155ByteCode } from "../artifacts/core/erc1155-bytecode"
import { useErc1155TokenStorage } from "../hooks/use-erc1155-token-storage"

export function Erc1155Deploy() {
  const [token, setTokenStorage] = useErc1155TokenStorage()
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [isWaitingTransaction, setIsWaitingTransaction] =
    useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!walletClient) return
    setIsSigning(true)

    let hash: `0x${string}` | undefined
    try {
      hash = await walletClient.deployContract({
        abi: erc1155ABI,
        bytecode: erc1155ByteCode,
        args: [name, symbol],
      })
    } catch (e) {
      setIsSigning(false)
      return
    }
    setIsSigning(false)
    setIsWaitingTransaction(true)
    try {
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      if (!receipt.contractAddress) return

      setIsWaitingTransaction(false)
      setTokenStorage(receipt.contractAddress)
    } catch (e) {
      setIsWaitingTransaction(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <label>Name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Symbol</label>
          <input
            className="input"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <ContractWriteButton
            isLoadingTx={isWaitingTransaction}
            isLoadingWrite={isSigning}
            loadingTxText="Deploying..."
            write={Boolean(name && symbol)}
          >
            Deploy
          </ContractWriteButton>
        </form>
        {(token || isWaitingTransaction) && (
          <div className="flex max-w-full flex-wrap items-center justify-between break-words pb-2 pt-5">
            <span className="font-semibold">
              {token ? "Mint Contract Address" : "Deploying contract"}:
            </span>
            <BlockExplorerLink address={token} />
          </div>
        )}
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="justify-between">
        <h3 className="text-center">ERC1155 Deploy</h3>
        <p className="text-center text-sm text-gray-500">
          Deploy a new mintable ERC1155 token to any blockchain
        </p>
      </CardFooter>
    </Card>
  )
}
