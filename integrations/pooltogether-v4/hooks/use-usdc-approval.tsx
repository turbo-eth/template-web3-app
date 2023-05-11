import { BigNumber } from 'ethers'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/prize-pool-contract-list'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/usdc-contract-list'

export function useUsdcApproval(userBalance: number) {
  const { address: accountAddress } = useAccount()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const usdcAddress = useLoadContractFromChainId(USDC_CONTRACT)

  const { data, isError, isLoading } = useContractRead({
    address: usdcAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [accountAddress as `0x${string}`, prizePoolAddress],
  })
  return data ? !BigNumber.from(data).eq(BigNumber.from(0)) && BigNumber.from(data).gte(BigNumber.from(userBalance * 1000000)) : false
}
