import { zodResolver } from '@hookform/resolvers/zod'
import { ethers, utils } from 'ethers'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTokenStorage } from './use-token-storage'
import { useErc20Transfer } from '../erc20-wagmi'
const writeTransferFormSchema = z.object({
  amount: z.string().min(1),
  fromAddress: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'Sender address is invalid. Please insure you have typed correctly.',
  }),
  toAddress: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'Reciever address is invalid. Please insure you have typed correctly.',
  }),
})

export const useWriteTransfer = () => {
  const form = useForm<z.infer<typeof writeTransferFormSchema>>({
    resolver: zodResolver(writeTransferFormSchema),
    defaultValues: {
      fromAddress: '',
      toAddress: '',
      amount: '',
    },
  })

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
