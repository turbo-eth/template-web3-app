import { FormEvent, useState } from "react"
import { usePublicClient, useWalletClient } from "wagmi"

import { BlockExplorerLink } from "@/components/blockchain/block-explorer-link"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"

import { erc1155ABI } from "../artifacts/test/erc1155-abi"
import { erc1155ByteCode } from "../artifacts/test/erc1155-bytecode"
import { useErc1155TokenStorage } from "../hooks/use-erc1155-token-storage"

export function Erc1155DeployTest() {
  const [token, setTokenStorage] = useErc1155TokenStorage()
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [isWaitingTransaction, setIsWaitingTransaction] =
    useState<boolean>(false)

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
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <ContractWriteButton
          isLoadingTx={isWaitingTransaction}
          isLoadingWrite={isSigning}
          loadingTxText="Deploying..."
        >
          Deploy Test ERC1155
        </ContractWriteButton>
      </form>
      {(token || isWaitingTransaction) && (
        <div className="flex max-w-full flex-wrap items-center justify-between break-words pt-5 pb-2">
          <span className="font-semibold">
            {token ? "Mint Contract Address" : "Deploying contract"}:
          </span>
          <BlockExplorerLink address={token} />
        </div>
      )}
      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">ERC1155 Deploy</h3>
        <p className="text-center text-sm text-gray-500">
          Deploy a test ERC1155 token to any blockchain
        </p>
      </div>
    </div>
  )
}
