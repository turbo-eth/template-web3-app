import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { useForm, useWatch } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { z } from 'zod'

import { createArweaveDataTx, signAndSendArweaveTx } from '@/integrations/arweave'
import { useArweaveWallet } from '@/integrations/arweave/hooks/use-arweave-wallet'

import { useEstimateTxFee } from '../../hooks/use-estimate-tx-fee'
import { convertBlobToBase64 } from '../../utils'
import { ArweaveTxTag } from '../../utils/types'

type ArweavePost = { tags: ArweaveTxTag[] } & ({ data: string; file?: never } | { data?: never; file: string | ArrayBuffer })

const useCreateArweavePostAPI = () => {
  return useMutation({
    mutationFn: async ({ wallet, payload }: { wallet: JWKInterface; payload: ArweavePost }) => {
      if (!wallet) throw 'No wallet connected.'

      if (!payload.data && !payload.file) {
        throw 'No Data or Files selected'
      }
      const tx = await createArweaveDataTx(wallet, payload.data ?? payload.file)
      const { txId, response, insufficientBalance } = await signAndSendArweaveTx(wallet, tx, payload.tags, !!payload.file)
      if (insufficientBalance) throw { insufficientBalance: true }
      if (response?.status !== 200) {
        throw `${response?.statusText ?? ''} - ${(response?.data as { error: string }).error}`
      }
      return txId
    },
  })
}

export const useArweavePostForm = () => {
  const { wallet } = useArweaveWallet()
  const { mutate, data, isLoading, isError, error, isSuccess } = useCreateArweavePostAPI()
  const txSchema = z.object({
    data: z.string(),
    file: z.instanceof(File).optional(),
    tags: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    ),
  })
  const form = useForm<z.infer<typeof txSchema>>({
    resolver: zodResolver(txSchema),
    defaultValues: {
      data: '',
      tags: [],
    },
  })

  const formData = useWatch({ name: 'data', control: form.control })
  const formFile = useWatch({ name: 'file', control: form.control })
  const debouncedFormData = useDebounce(formData, 1000)
  const { estimatedTxFee, isEstimatingTxFee, estimationError, estimateTxFee, setIsEstimatingTxFee, reset } = useEstimateTxFee()

  useEffect(() => {
    if (form.formState.isValid && !form.formState.isValidating) {
      if (debouncedFormData === '') reset()
      else estimateTxFee(JSON.stringify(debouncedFormData))
    }
  }, [debouncedFormData])

  useEffect(() => {
    if (form.formState.isValid && !form.formState.isValidating) {
      if (formFile) {
        setIsEstimatingTxFee(true)
        convertBlobToBase64(formFile)
          .then((base64) => {
            estimateTxFee(base64)
          })
          .catch(console.error)
          .finally(() => setIsEstimatingTxFee(false))
      } else {
        reset()
      }
    }
  }, [formFile])

  const onSubmit = async (values: z.infer<typeof txSchema>) => {
    try {
      if (!wallet) {
        console.error('No Arweave wallet connected.')
        return
      }
      if (values.file) {
        const base64File = await convertBlobToBase64(values.file)
        mutate({ wallet, payload: { file: base64File, tags: values.tags } })
      } else {
        mutate({ wallet, payload: { data: values.data, tags: values.tags } })
      }
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
    txSchema,
    form,
    onSubmit,
    estimation: { estimatedTxFee, isEstimatingTxFee, estimationError },
  }
}
