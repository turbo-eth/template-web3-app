import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LinkComponent } from "@/components/shared/link-component"

export const InsufficientBalanceError = () => {
  return (
    <div className="my-2 text-sm text-red-500">
      Insuffient balance. you can buy $AR at
      <Link
        href={"https://binance.com"}
        target="_blank"
        rel="noreferrer noopenner"
        className={cn(buttonVariants({ variant: "link" }))}
      >
        Binance
      </Link>
      and transfer to your Arweave wallet.
    </div>
  )
}
