import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getArweaveTxStatus } from '@/integrations/arweave'
import { UpdateArweaveAccountPayload, updateArweaveAccount } from '@/integrations/arweave/arweave-account'
import { useArweaveWallet } from '@/integrations/arweave/hooks/use-arweave-wallet'

const useEditProfileAPI = () => {
  return useMutation({
    mutationFn: async ({ wallet, payload }: { wallet: JWKInterface; payload: UpdateArweaveAccountPayload }) => {
      const [txId, response] = await updateArweaveAccount(wallet, payload)
      if (response?.status !== 200) {
        throw (response?.data as { error: string }).error
      }
      const status = await getArweaveTxStatus(txId)
      return status
    },
  })
}

export const useArweaveAccountForm = () => {
  const { account, wallet } = useArweaveWallet()
  const { mutate, data, isLoading, isError, error, isSuccess } = useEditProfileAPI()
  const profileSchema = z.object({
    handleName: z.string().min(1),
    avatar: z.string().optional(),
    banner: z.string().optional(),
    name: z.string().optional(),
    bio: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    wallets: z.object({
      eth: z
        .string()
        .refine((value) => ethers.utils.isAddress(value), {
          message: 'Provided address is invalid. Please insure you have typed correctly.',
        })
        .optional()
        .or(z.literal('')),
    }),
    links: z.object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      instagram: z.string().optional(),
      discord: z.string().optional(),
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
      youtube: z.string().optional(),
      twitch: z.string().optional(),
    }),
  })
  const profile = account?.profile ?? null
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { ...(profile ?? {}) },
  })

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      if (!wallet) {
        console.error('No Arweave wallet connected.')
        return
      }
      mutate({ wallet, payload: { handleName: values.handleName } })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    error,
    data,
    isError,
    isLoading,
    isSuccess,
    profileSchema,
    form,
    onSubmit,
  }
}
