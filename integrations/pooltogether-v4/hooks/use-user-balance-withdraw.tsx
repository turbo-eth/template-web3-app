import { formatUnits } from 'viem'
import { useAccount, useNetwork } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/utils/ticket-contract-list'
import { useErc20BalanceOf, useErc20Decimals } from '@/lib/generated/blockchain'

export function useUserBalanceWithdraw() {
  const { address: accountAddress } = useAccount()
  const { chain } = useNetwork()

  const address = useLoadContractFromChainId(TICKET_CONTRACT)
  const { data: decimals } = useErc20Decimals({ address })

  const { data: erc20Balance } = useErc20BalanceOf({
    chainId: chain?.id,
    address,
    watch: true,
    args: [accountAddress || '0x0'],
  })

  return erc20Balance ? Number(formatUnits(erc20Balance, decimals || 1)) : 0
}
