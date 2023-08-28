import { useEffect, useState } from "react"
import Image from "next/image"
import { TiArrowRight } from "react-icons/ti"
import { parseUnits } from "viem"
import { useAccount, useWaitForTransaction } from "wagmi"

import { useErc20Decimals, useErc20Symbol } from "@/lib/generated/blockchain"
import { useToast } from "@/lib/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"

import {
  usePoolSetUserUseReserveAsCollateral,
  usePoolWithdraw,
} from "../generated/aave-wagmi"
import { useAave } from "../hooks/use-aave"

interface ISuppliedAssetsItemProps {
  address: `0x${string}`
  balance: number
  collateralEnabled: boolean
  liquidityRate: number
  canBeCollateral: boolean
}

const getSymbol = (symbol: string | undefined) =>
  symbol === "WETH" ? "ETH" : symbol

export const SuppliedAssetsItem = ({
  address,
  balance,
  collateralEnabled,
  canBeCollateral,
  liquidityRate,
}: ISuppliedAssetsItemProps) => {
  const { address: user } = useAccount()
  const { poolAddress } = useAave()

  const symbol = getSymbol(useErc20Symbol({ address }).data)
  const { data: decimals } = useErc20Decimals({ address })

  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const handleToast = () => {
    toast({
      title: "Success",
      description: `${symbol ?? ""} successfully withdrawn`,
      duration: 4200,
    })
  }

  const switchCollateralUsage = () => {
    writeSetUserUseReserveAsCollateral()
  }

  const buttonAction = () => {
    withdrawWrite()
  }

  const getWithdrawAmount = () => {
    return parseUnits(`${Number(withdrawAmount)}`, decimals ?? 18)
  }

  const {
    error: setUserUseReserveAsCollateralError,
    write: writeSetUserUseReserveAsCollateral,
  } = usePoolSetUserUseReserveAsCollateral({
    address: poolAddress,
    args: [address, !collateralEnabled],
  })

  const {
    error: withdrawError,
    data: data,
    isLoading: isLoadingWrite,
    write: withdrawWrite,
  } = usePoolWithdraw({
    address: poolAddress,
    args: [address, getWithdrawAmount(), user as `0x${string}`],
  })

  const { isLoading: isLoadingTx, isSuccess: isSuccessTx } =
    useWaitForTransaction({
      hash: data?.hash,
    })

  const setMaxAmount = () => setWithdrawAmount(balance.toString())

  useEffect(() => {
    if (setUserUseReserveAsCollateralError) {
      if (
        setUserUseReserveAsCollateralError?.name ===
        "ContractFunctionExecutionError"
      ) {
        alert(
          "You can't switch collateral mode because it will cause collateral call!"
        )
      }
    }
  }, [setUserUseReserveAsCollateralError])

  useEffect(() => {
    if (withdrawError) {
      if (withdrawError?.name === "ContractFunctionExecutionError") {
        alert(
          "You can't withdraw that amount because it will cause collateral call!"
        )
      }
    }
  }, [withdrawError])

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
          src={`https://app.aave.com/icons/tokens/${
            symbol ? symbol.toLowerCase() : ""
          }.svg`}
          width={25}
        />
        {symbol === "WETH" ? "ETH" : symbol}
      </td>
      <td className="px-4 py-2 text-center">{balance.toFixed(5)}</td>
      <td className="px-4 py-2 text-center">
        {liquidityRate !== 0 ? `${liquidityRate.toFixed(2)}%` : "0"}
      </td>
      <td className="px-4 py-2 text-center">
        <Switch
          checked={collateralEnabled}
          className="bg-green-700"
          disabled={!canBeCollateral}
          onClick={switchCollateralUsage}
        />
      </td>
      <td className="px-4 py-2 text-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="mr-2">Withdraw</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Withdraw {symbol}</DialogTitle>
            <DialogDescription>
              <div className="mb-2 mt-4">
                <label>Amount</label>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <input
                    className="border-none dark:bg-slate-900"
                    placeholder="0.00"
                    type="text"
                    value={withdrawAmount}
                    onChange={(e) => {
                      const regex = /^[0-9.,\b]+$/
                      let value = e.target.value
                      if (value === "" || regex.test(value)) {
                        if (value.startsWith(".") || value.startsWith(",")) {
                          value = `0${value}`
                        }
                        value = value.replace(",", ".")
                        setWithdrawAmount(value)
                        if (balance - Number(value) < 0) setMaxAmount()
                      }
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <Image
                      alt={symbol?.toString() ?? ""}
                      className="mr-2 rounded-full"
                      height={25}
                      src={`https://app.aave.com/icons/tokens/${
                        symbol ? symbol.toLowerCase() : ""
                      }.svg`}
                      width={25}
                    />
                    <span className="font-bold">{symbol}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div></div>
                  <div className="flex items-center justify-between">
                    <span>Available: {balance.toFixed(5)}</span>
                    <Button className="ml-3" onClick={setMaxAmount}>
                      Max
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mb-2 mt-5">
                <label>Transaction overview</label>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span>Remaining debt</span>
                  <div className="flex items-center justify-between">
                    <span>
                      <span className="font-bold">{balance.toFixed(5)}</span>{" "}
                      {symbol}
                    </span>
                    {Number(withdrawAmount) > 0 && (
                      <>
                        <TiArrowRight />
                        <span>
                          <span className="font-bold">
                            {(balance - Number(withdrawAmount)).toFixed(5)}
                          </span>{" "}
                          {symbol}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <ContractWriteButton
                className="mt-5 w-full"
                disabled={
                  !Number(withdrawAmount) || isLoadingTx || isLoadingWrite
                }
                isLoadingTx={isLoadingTx}
                isLoadingWrite={isLoadingWrite}
                loadingTxText="Withdrawing..."
                write={!!withdrawWrite}
                onClick={buttonAction}
              >
                {`Withdraw ${symbol ?? ""}`}
              </ContractWriteButton>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
