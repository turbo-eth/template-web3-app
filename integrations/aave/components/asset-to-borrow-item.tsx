"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { parseUnits } from "viem"
import { useAccount, useWaitForTransaction } from "wagmi"

import { useErc20Decimals } from "@/lib/generated/blockchain"
import { useToast } from "@/lib/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"

import { usePoolBorrow } from "../generated/aave-wagmi"
import { useAave } from "../hooks/use-aave"

interface IAssetToSupplyItem {
  address: `0x${string}`
  symbol: string
  tokenPriceInUsd: number
  aTokensBalance: number
  variableBorrowRate: number
  stableBorrowRate?: number
  canBorrowStableRateMode?: boolean
}

export const AssetToBorrowItem = ({
  address,
  aTokensBalance,
  symbol,
  tokenPriceInUsd,
  variableBorrowRate,
  stableBorrowRate,
  canBorrowStableRateMode,
}: IAssetToSupplyItem) => {
  const { maxBorrowableInUsd, poolAddress } = useAave()
  const { address: user } = useAccount()
  const [borrowAmount, setBorrowAmount] = useState("")
  const [borrowVariableRateMode, setBorrowVariableRateMode] = useState(true)
  const { data: decimals } = useErc20Decimals({ address })
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleToast = () => {
    toast({
      title: "Success",
      description: `${symbol} successfully borrowed`,
      duration: 4200,
    })
  }

  const {
    data,
    isLoading: isLoadingWrite,
    write: borrowWrite,
  } = usePoolBorrow({
    address: poolAddress,
    args: [
      address,
      parseUnits(`${Number(borrowAmount)}`, decimals ?? 18),
      borrowVariableRateMode ? BigInt(2) : BigInt(1),
      0,
      user as `0x${string}`,
    ],
  })

  const { isLoading: isLoadingTx, isSuccess: isSuccessTx } =
    useWaitForTransaction({
      hash: data?.hash,
    })

  const buttonAction = () => {
    if (Number(borrowAmount) < aTokensBalance && !borrowVariableRateMode) {
      return alert(
        "You have to borrow more than the amount supplied on stable rate mode!"
      )
    }
    borrowWrite()
  }

  const setMaxAmount = () =>
    setBorrowAmount(((maxBorrowableInUsd / tokenPriceInUsd) * 0.8).toFixed(2))

  useEffect(() => {
    if (isSuccessTx) {
      handleToast()
      setOpen(false)
    }
  }, [isSuccessTx])

  return (
    <tr>
      <td className="mt-2 flex items-center justify-center px-4 py-2">
        <Image
          alt={symbol?.toString() ?? ""}
          className="mr-2 rounded-full"
          height={25}
          src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
          width={25}
        />
        {symbol}
      </td>
      <td
        className={`px-4 py-2 text-center ${
          maxBorrowableInUsd === 0 ? "text-muted-foreground" : ""
        }`}
      >
        {/* Only allowing borrowing 80% of max borrow amount to keep health factor safe */}
        {maxBorrowableInUsd > 0
          ? ((maxBorrowableInUsd / tokenPriceInUsd) * 0.8).toFixed(2)
          : "0"}{" "}
      </td>
      <td className="px-4 py-2 text-center">
        {variableBorrowRate.toFixed(2)}%
      </td>
      <td className="px-4 pb-2 text-center">
        {stableBorrowRate ? `${stableBorrowRate.toFixed(2)}%` : "—"}
      </td>
      <td className="px-4 py-2 text-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger disabled={maxBorrowableInUsd === 0}>
            <Button className="mr-2" disabled={maxBorrowableInUsd === 0}>
              Borrow
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Borrow {symbol}</DialogTitle>
            <DialogDescription>
              {canBorrowStableRateMode && (
                <>
                  <div className="mb-2 mt-4">
                    <label>Borrow APY rate</label>
                  </div>
                  <Select
                    value={borrowVariableRateMode ? "variable" : "stable"}
                    onValueChange={(value) =>
                      setBorrowVariableRateMode(value === "variable")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent className="w-56">
                      <SelectItem value="variable">
                        <div className="flex items-center justify-between">
                          Variable
                        </div>
                      </SelectItem>
                      <SelectItem value="stable">
                        <div className="flex items-center justify-between">
                          Stable
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              <div className="mb-2 mt-4">
                <label>Amount</label>
              </div>
              <div className="input bg-background">
                <div className="flex items-center justify-between">
                  <input
                    className="border-none bg-background"
                    placeholder="0.00"
                    type="text"
                    value={borrowAmount}
                    onChange={(e) => {
                      const regex = /^[0-9.,\b]+$/
                      let value = e.target.value
                      if (value === "" || regex.test(value)) {
                        if (value.startsWith(".") || value.startsWith(",")) {
                          value = `0${value}`
                        }
                        value = value.replace(",", ".")
                        setBorrowAmount(value)
                        if (
                          Number(value) >
                          (maxBorrowableInUsd / tokenPriceInUsd) * 0.8
                        )
                          setMaxAmount()
                      }
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <Image
                      alt={symbol?.toString() ?? ""}
                      className="mr-2 rounded-full"
                      height={25}
                      src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
                      width={25}
                    />
                    <span className="font-bold">{symbol}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div></div>
                  <div className="flex items-center justify-between">
                    <span>
                      Available:{" "}
                      {((maxBorrowableInUsd / tokenPriceInUsd) * 0.8).toFixed(
                        2
                      )}
                    </span>{" "}
                    {/* Showing 80% to keep health factor "safe" */}
                    <Button className="ml-3" onClick={setMaxAmount}>
                      Max
                    </Button>
                  </div>
                </div>
              </div>
              <ContractWriteButton
                className="mt-5 w-full"
                disabled={
                  !Number(borrowAmount) || isLoadingTx || isLoadingWrite
                }
                isLoadingTx={isLoadingTx}
                isLoadingWrite={isLoadingWrite}
                loadingTxText="Borrowing..."
                write={!!borrowWrite}
                onClick={buttonAction}
              >
                Borrow {symbol}
              </ContractWriteButton>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
