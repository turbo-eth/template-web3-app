import { useAccount } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/utils/usdc-contract-list'
import { useErc20Allowance } from '@/lib/generated/blockchain'

export function useUsdcApproval(userBalance: number) {
  const { address: accountAddress } = useAccount()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const usdcAddress = useLoadContractFromChainId(USDC_CONTRACT)

  const { data } = useErc20Allowance({
    address: usdcAddress,
    args: [accountAddress || '0x0', prizePoolAddress],
  })
  return data ? !(BigInt(data) == BigInt(0)) && BigInt(data) >= BigInt(userBalance * 1000000) : false
}
