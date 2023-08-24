import { LinkComponent } from "@/components/shared/link-component"

export const InsufficientBalanceError = () => {
  return (
    <div className="my-2 text-sm text-red-500">
      Insuffient balance. you can buy $AR at
      <LinkComponent
        isExternal
        className="link px-1"
        href={"https://binance.com"}
      >
        Binance
      </LinkComponent>
      and transfer to your Arweave wallet.
    </div>
  )
}
