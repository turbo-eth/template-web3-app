import { useErc20BalanceOf, useErc20Decimals } from '@turbo-eth/erc20-wagmi'
import { formatUnits } from 'ethers/lib/utils'
import { useAccount, useNetwork } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/usdc-contract-list'

export function useUserBalanceDeposit() {
  const { address: accountAddress } = useAccount()
  const { chain } = useNetwork()

  const address = useLoadContractFromChainId(USDC_CONTRACT)
  const { data: decimals } = useErc20Decimals({ address })
  const { data: erc20Balance } = useErc20BalanceOf({
    chainId: chain?.id,
    address,
    watch: true,
    args: [accountAddress as `0x${string}`],
  })

  return erc20Balance ? (formatUnits(erc20Balance.toString() as unknown as bigint, decimals as number) as unknown as number) : 0
}
