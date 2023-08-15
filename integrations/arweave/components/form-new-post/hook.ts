import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ArweaveTxTag, createArweaveDataTx, getArweaveTxStatus, signAndSendArweaveTx } from '@/integrations/arweave'
import { useArweaveWallet } from '@/integrations/arweave/hooks/use-arweave-wallet'

import { convertFileToBase64 } from '../../utils'

type ArweavePost = { tags: ArweaveTxTag[] } & ({ data: string; file?: never } | { data?: never; file: File })

const useCreateArweavePostAPI = () => {
  return useMutation({
    mutationFn: async ({ wallet, payload }: { wallet: JWKInterface; payload: ArweavePost }) => {
      if (!wallet) throw 'No wallet connected.'

      if (!payload.data && !payload.file) {
        throw 'No Data or Files selected'
      }
      const tx = await createArweaveDataTx(wallet, payload.data ?? (await convertFileToBase64(payload.file)))
      const [txId] = await signAndSendArweaveTx(wallet, tx, payload.tags, !!payload.file)
      const status = await getArweaveTxStatus(txId)
      return status
    },
  })
}

export const useArweavePostForm = () => {
  const { wallet } = useArweaveWallet()
  const { mutate, data, isLoading, isError, error, isSuccess } = useCreateArweavePostAPI()
  const profileSchema = z.object({
    data: z.string(),
    file: z.any(),
    tags: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    ),
  })
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      data: '',
      file: undefined,
      tags: [{ name: 'tag name', value: 'tag value' }],
    },
  })

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      if (!wallet) {
        console.error('No Arweave wallet connected.')
        return
      }
      mutate({ wallet, payload: values })
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
