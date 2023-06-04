import { zodResolver } from '@hookform/resolvers/zod'
import { utils } from 'ethers'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { z } from 'zod'

import { useTokenStorage } from './use-token-storage'
import { useErc20MintableMint } from '../erc20-wagmi'

export const useWriteMint = ({ writeMintFormSchema }) => {
  const { address } = useAccount()
  const form = useForm<z.infer<typeof writeMintFormSchema>>({
    resolver: zodResolver(writeMintFormSchema),
    defaultValues: {
      amount: '',
    },
  })
  const [token] = useTokenStorage()

  // @ts-ignore
  const mintAction = useErc20MintableMint({
    address: token as `0x${string}`,
  })

  const onSubmit = async (values: z.infer<typeof writeMintFormSchema>) => {
    // @ts-ignore
    const tx = await mintAction.writeAsync({
      recklesslySetUnpreparedArgs: [address as `0x${string}`, utils.parseEther(values.amount)],
    })
    form.reset()
  }

  return { form, onSubmit }
}
