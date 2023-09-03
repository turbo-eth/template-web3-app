import { HTMLAttributes } from "react"
import { useAccount, useBalance } from "wagmi"

import { trimFormattedBalance } from "@/lib/utils"

interface WalletBalanceProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  decimals?: number
}

export const WalletBalance = ({
  className,
  decimals = 4,
  ...props
}: WalletBalanceProps) => {
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address,
  })

  if (!address || !balance) return null

  return (
    <span className={className} {...props}>
      {trimFormattedBalance(balance.formatted, decimals)}
    </span>
  )
}
