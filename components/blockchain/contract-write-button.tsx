import { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

interface ContractWriteButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoadingTx: boolean
  isLoadingWrite: boolean
  write?: boolean
  loadingWriteText?: string
  loadingTxText?: string
  text?: string
}

export const ContractWriteButton = ({
  children,
  className,
  isLoadingTx,
  isLoadingWrite,
  write = true,
  loadingWriteText = "Sign the transaction in your wallet",
  loadingTxText = "Writing...",
  ...props
}: ContractWriteButtonProps) => {
  return (
    <Button
      className={className}
      disabled={!write || isLoadingWrite || isLoadingTx}
      {...props}
    >
      {isLoadingWrite
        ? loadingWriteText
        : isLoadingTx
        ? loadingTxText
        : children}
    </Button>
  )
}
