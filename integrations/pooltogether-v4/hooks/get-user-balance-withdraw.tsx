import { useErc20BalanceOf, useErc20Decimals } from '@turbo-eth/erc20-wagmi'
import { formatUnits } from 'ethers/lib/utils'
import { useAccount, useNetwork } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/ticket-contract-list'

export function GetUserBalanceWithdraw() {
  const { address: accountAddress } = useAccount()
  const { chain } = useNetwork()

  const address = useLoadContractFromChainId(TICKET_CONTRACT)
  const { data: decimals } = useErc20Decimals({
    chainId: chain?.id,
    address,
  })

  const { data, isError, isLoading } = useErc20BalanceOf({
    chainId: chain?.id,
    address,
    watch: true,
    args: [accountAddress as `0x${string}`],
  })

  return data ? (formatUnits(data.toString() as unknown as bigint, decimals as number) as unknown as number) : 0
}
