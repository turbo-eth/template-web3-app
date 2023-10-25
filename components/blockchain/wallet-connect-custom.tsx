import { HTMLAttributes } from "react"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useAccount } from "wagmi"

interface WalletConnectCustomProps extends HTMLAttributes<HTMLDivElement> {
  classNameConnect?: string
  classNameConnected?: string
  classNameNetwork?: string
  labelConnect?: string
  labelNetwork?: string
}

export const WalletConnectCustom = ({
  classNameConnect,
  classNameConnected,
  classNameNetwork,
  labelConnect = "Connect Wallet",
  labelNetwork = "Open Network Modal",
  ...props
}: WalletConnectCustomProps) => {
  // 4. Use modal hook
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  return (
    <div {...props}>
      {isConnected && address ? (
        <button className={classNameConnected} onClick={() => open()}>
          {`${address.slice(0, 8)}...${address.slice(34, 42)}`}
        </button>
      ) : (
        <button
          className={classNameConnect}
          onClick={() => open({ view: "Account" })}
        >
          {labelConnect}
        </button>
      )}

      <button
        className={classNameNetwork}
        onClick={() => open({ view: "Networks" })}
      >
        {labelNetwork}
      </button>
    </div>
  )
}

export default WalletConnectCustom
