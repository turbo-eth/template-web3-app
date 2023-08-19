import { LinkComponent } from '@/components/shared/link-component'

// TODO: change the exchange name and url
export const InsufficientBalanceError = () => {
  return (
    <div className="text-red-500 text-sm my-2">
      Insuffient balance. you can buy $AR at
      <LinkComponent isExternal className="link px-1" href={'https://'}>
        FOO exchange
      </LinkComponent>
      and transfer to your Arweave wallet.
    </div>
  )
}
