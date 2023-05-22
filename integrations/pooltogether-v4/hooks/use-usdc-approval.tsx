import { useErc20Allowance } from '@turbo-eth/erc20-wagmi'
import { BigNumber } from 'ethers'
import { useAccount } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/utils/usdc-contract-list'

export function useUsdcApproval(userBalance: number) {
  const { address: accountAddress } = useAccount()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const usdcAddress = useLoadContractFromChainId(USDC_CONTRACT)

  const { data } = useErc20Allowance({
    address: usdcAddress,
    args: [accountAddress || '0x0', prizePoolAddress],
  })
  return data ? !BigNumber.from(data).eq(BigNumber.from(0)) && BigNumber.from(data).gte(BigNumber.from(userBalance * 1000000)) : false
}
