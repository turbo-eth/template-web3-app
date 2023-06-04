import { zodResolver } from '@hookform/resolvers/zod'
import { utils } from 'ethers'
import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'
import { z } from 'zod'

import { useTokenStorage } from './use-token-storage'
import { useErc20Transfer } from '../erc20-wagmi'

export const useWriteTransfer = ({ writeTransferFormSchema }) => {
  const form = useForm<z.infer<typeof writeTransferFormSchema>>({
    resolver: zodResolver(writeTransferFormSchema),
    defaultValues: {
      fromAddress: '',
      toAddress: '',
      amount: '',
    },
  })
  const { data: signer } = useSigner()

  const [token] = useTokenStorage()
  // @ts-ignore
  const mintAction = useErc20Transfer({
    address: token,
  })

  const onSubmit = async (values: z.infer<typeof writeTransferFormSchema>) => {
    // @ts-ignore
    const tx = await mintAction.writeAsync({
      recklesslySetUnpreparedArgs: [values?.toAddress as `0x${string}`, utils.parseEther(values.amount)],
    })

    form.reset()
  }

  return {
    form,
    onSubmit,
  }
}
