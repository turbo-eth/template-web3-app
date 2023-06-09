import { formatUnits } from 'viem'
import { useAccount, useNetwork } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/utils/usdc-contract-list'
import { useErc20BalanceOf, useErc20Decimals } from '@/lib/blockchain'

export function useUserBalanceDeposit() {
  const { address: accountAddress } = useAccount()
  const { chain } = useNetwork()

  const address = useLoadContractFromChainId(USDC_CONTRACT)
  const { data: decimals } = useErc20Decimals({ address })
  const { data: erc20Balance } = useErc20BalanceOf({
    chainId: chain?.id,
    address,
    watch: true,
    args: [accountAddress || '0x0'],
  })

  return erc20Balance ? Number(formatUnits(erc20Balance, decimals || 1)) : 0
}
