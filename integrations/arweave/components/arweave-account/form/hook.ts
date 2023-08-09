import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { T_profile } from 'arweave-account/lib/types'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { updateArweaveAccount } from '@/integrations/arweave/arweave-account'
import { useArweaveAccount } from '@/integrations/arweave/hooks/use-arweave-account'
import { useArweaveWallet } from '@/integrations/arweave/hooks/use-arweave-wallet'

const useEditProfileAPI = () => {
  return useMutation({
    mutationFn: async ({ wallet, payload }: { wallet: JWKInterface; payload: T_profile }) => {
      console.error({ wallet, payload })
      if (!wallet) return
      return await updateArweaveAccount(wallet, payload)
    },
  })
}

export const useArweaveAccountForm = () => {
  const { wallet } = useArweaveWallet()
  const { account } = useArweaveAccount()
  const { mutate, data, isLoading, isError, error, isSuccess } = useEditProfileAPI()
  const profileSchema = z.object({
    handleName: z.string(),
    avatar: z.string(),
    banner: z.string(),
    name: z.string(),
    bio: z.string(),
    email: z.string(),
    wallets: z.object({ eth: z.string() }),
    links: z.object({
      twitter: z.string(),
      github: z.string(),
      instagram: z.string(),
      discord: z.string(),
      facebook: z.string(),
      linkedin: z.string(),
      youtube: z.string(),
      twitch: z.string(),
    }),
  })
  const profile = account?.profile ?? null
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      handleName: profile?.handleName ?? '',
      avatar: profile?.avatar ?? '',
      banner: profile?.banner ?? '',
      name: profile?.name ?? '',
      bio: profile?.bio ?? '',
      email: profile?.email ?? '',
      wallets: { eth: profile?.wallets.eth ?? '' },
      links: {
        twitter: profile?.links.twitter ?? '',
        github: profile?.links.github ?? '',
        instagram: profile?.links.instagram ?? '',
        discord: profile?.links.discord ?? '',
        facebook: profile?.links.facebook ?? '',
        linkedin: profile?.links.linkedin ?? '',
        youtube: profile?.links.youtube ?? '',
        twitch: profile?.links.twitch ?? '',
      },
    },
  })

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      if (!wallet) {
        console.error('No Arweave wallet connected.')
        return
      }
      mutate({ wallet, payload: { ...values, bannerURL: values.banner, avatarURL: values.avatar } })
      form.reset()
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
