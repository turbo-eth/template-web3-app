import { useEffect, useState } from "react"
import Image from "next/image"
import { TiArrowRight } from "react-icons/ti"
import { formatUnits, parseUnits } from "viem"
import { useAccount, useWaitForTransaction } from "wagmi"

import {
  useErc20Allowance,
  useErc20Approve,
  useErc20BalanceOf,
  useErc20Decimals,
  useErc20Symbol,
} from "@/lib/generated/blockchain"
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

import {
  usePoolRepay,
  usePoolRepayWithATokens,
  usePoolSwapBorrowRateMode,
} from "../generated/aave-wagmi"
import { useAave } from "../hooks/use-aave"
import { limitDecimals } from "../utils"

interface IBorrowedAssetsItemProps {
  address: `0x${string}`
  aTokenBalance: bigint
  debt: number
  borrowRate: number
  rateMode: bigint
  canSwitchRateMode?: boolean
}

const getSymbol = (symbol: string | undefined) =>
  symbol === "WETH" ? "ETH" : symbol

export const BorrowedAssetsItem = ({
  address,
  aTokenBalance,
  debt,
  borrowRate,
  canSwitchRateMode,
  rateMode,
}: IBorrowedAssetsItemProps) => {
  const { address: user } = useAccount()
  const { poolAddress } = useAave()
  const [repayAmount, setRepayAmount] = useState("")
  const [repayWithATokens, setRepayWithATokens] = useState(false)
  const [open, setOpen] = useState(false)

  const symbol = getSymbol(useErc20Symbol({ address }).data)
  const { data: tokenBalance } = useErc20BalanceOf({
    address,
    args: user ? [user] : undefined,
    watch: true,
  })
  const { data: decimals } = useErc20Decimals({ address })
  const allowance = useErc20Allowance({
    address,
    args: user ? [user, poolAddress] : undefined,
    watch: true,
  }).data

  const { toast } = useToast()

  const handleToast = () => {
    toast({
      title: "Success",
      description: `${symbol ?? ""} successfully repaid`,
      duration: 4200,
    })
  }

  const {
    data: dataApprove,
    isLoading: isLoadingApproveWrite,
    write: approveWrite,
  } = useErc20Approve({
    address,
    args: [poolAddress, parseUnits(`${Number(repayAmount)}`, decimals ?? 18)],
  })

  const { isLoading: isLoadingApproveTx } = useWaitForTransaction({
    hash: dataApprove?.hash,
  })

  const {
    data: dataRepay,
    isLoading: isLoadingRepayWrite,
    write: repayWrite,
  } = usePoolRepay({
    address: poolAddress,
    args: [
      address,
      parseUnits(`${Number(repayAmount)}`, decimals ?? 18),
      rateMode,
      user as `0x${string}`,
    ],
  })

  const { isLoading: isLoadingRepayTx, isSuccess: isSuccessRepayTx } =
    useWaitForTransaction({
      hash: dataRepay?.hash,
    })

  const {
    data: dataRepayATokens,
    isLoading: isLoadingRepayATokensWrite,
    write: repayWithATokensWrite,
  } = usePoolRepayWithATokens({
    address: poolAddress,
    args: [
      address,
      parseUnits(`${Number(repayAmount)}`, decimals ?? 18),
      rateMode,
    ],
  })

  const {
    isLoading: isLoadingRepayATokensTx,
    isSuccess: isSuccessRepayATokensTx,
  } = useWaitForTransaction({
    hash: dataRepayATokens?.hash,
  })

  const { write: swapBorrowRateModeWrite } = usePoolSwapBorrowRateMode({
    address: poolAddress,
    args: [address, rateMode],
  })

  const getRepayBalance = () =>
    repayWithATokens ? aTokenBalance : tokenBalance

  const buttonAction = () => {
    if (
      Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) <
      Number(repayAmount)
    ) {
      approveWrite()
    } else {
      if (repayWithATokens) {
        repayWithATokensWrite()
      } else {
        repayWrite()
      }
    }
  }

  const isApproving = () =>
    Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) <
    Number(repayAmount)

  const setMaxAmount = () => {
    if (
      Number(formatUnits(getRepayBalance() ?? BigInt(1), decimals ?? 18)) > debt
    ) {
      setRepayAmount(debt.toString())
    } else {
      setRepayAmount(
        formatUnits(getRepayBalance() ?? BigInt(1), decimals ?? 18)
      )
    }
  }

  useEffect(() => {
    if (isSuccessRepayTx || isSuccessRepayATokensTx) {
      handleToast()
      setOpen(false)
    }
  }, [isSuccessRepayTx, isSuccessRepayATokensTx])

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
      <td className="px-4 py-2 text-center">
        {limitDecimals(debt.toString(), 5)}
      </td>
      <td className="px-4 py-2 text-center">{borrowRate.toFixed(2)}%</td>
      <td className="px-4 pb-2 text-center">
        <Select
          disabled={!canSwitchRateMode}
          value={rateMode.toString()}
          onValueChange={() => swapBorrowRateModeWrite()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent className="w-56">
            <SelectItem value="2">
              <div className="flex items-center justify-between">Variable</div>
            </SelectItem>
            <SelectItem value="1">
              <div className="flex items-center justify-between">Stable</div>
            </SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="px-4 py-2 text-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="mr-2">Repay</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Repay {symbol}</DialogTitle>
            <DialogDescription>
              <div className="mb-2 mt-4">
                <label>Repay with</label>
              </div>
              <Select
                value={repayWithATokens ? "aTokens" : "walletBalance"}
                onValueChange={(value) =>
                  setRepayWithATokens(value === "aTokens")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent className="w-56">
                  <SelectItem value="walletBalance">
                    <div className="flex items-center justify-between">
                      Wallet balance
                    </div>
                  </SelectItem>
                  <SelectItem value="aTokens">
                    <div className="flex items-center justify-between">
                      Collateral
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="mb-2 mt-4">
                <label>Amount</label>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <input
                    className="border-none dark:bg-slate-900"
                    placeholder="0.00"
                    type="text"
                    value={repayAmount}
                    onChange={(e) => {
                      const regex = /^[0-9.,\b]+$/
                      let value = e.target.value
                      if (value === "" || regex.test(value)) {
                        if (value.startsWith(".") || value.startsWith(",")) {
                          value = `0${value}`
                        }
                        value = value.replace(",", ".")
                        if (
                          Number(value) >
                          Number(
                            formatUnits(
                              getRepayBalance() ?? BigInt(1),
                              decimals ?? 18
                            )
                          )
                        )
                          if (
                            Number(
                              formatUnits(
                                getRepayBalance() ?? BigInt(1),
                                decimals ?? 18
                              )
                            ) > debt
                          ) {
                            value = debt.toString()
                          } else {
                            value = formatUnits(
                              getRepayBalance() ?? BigInt(1),
                              decimals ?? 18
                            )
                          }

                        setRepayAmount(value)
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
                    <span>
                      {repayWithATokens
                        ? `a${symbol ?? ""} balance`
                        : "Wallet balance"}
                      :{" "}
                      {limitDecimals(
                        formatUnits(
                          getRepayBalance() ?? BigInt(1),
                          decimals ?? 18
                        ),
                        5
                      )}
                    </span>
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
                      <span className="font-bold">{debt.toFixed(5)}</span>{" "}
                      {symbol}
                    </span>
                    {Number(repayAmount) > 0 && (
                      <>
                        <TiArrowRight />
                        <span>
                          <span className="font-bold">
                            {(debt - Number(repayAmount)).toFixed(5)}
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
                disabled={!Number(repayAmount)}
                isLoadingTx={
                  isLoadingApproveTx ||
                  isLoadingRepayTx ||
                  isLoadingRepayATokensTx
                }
                isLoadingWrite={
                  isLoadingApproveWrite ||
                  isLoadingRepayWrite ||
                  isLoadingRepayATokensWrite
                }
                loadingTxText={isApproving() ? `Approving...` : `Repaying...`}
                write={
                  !!approveWrite || !!repayWrite || !!repayWithATokensWrite
                }
                onClick={buttonAction}
              >
                {`${isApproving() ? `Approve` : `Repay`} ${symbol ?? ""}`}
              </ContractWriteButton>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
