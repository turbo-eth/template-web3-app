import { useAccount, useChainId } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/utils/ticket-contract-list'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/utils/usdc-contract-list'
import { useErc20BalanceOf } from '@/lib/generated/blockchain'

export function useUserBalance({ type }: { type: 'deposit' | 'withdraw' }) {
  const { address: accountAddress } = useAccount()
  const chainId = useChainId()

  const address = useLoadContractFromChainId(type === 'deposit' ? USDC_CONTRACT : TICKET_CONTRACT)
  const { data: erc20Balance } = useErc20BalanceOf({
    chainId,
    address,
    watch: true,
    args: accountAddress ? [accountAddress] : undefined,
  })

  return erc20Balance ?? BigInt(0)
}
