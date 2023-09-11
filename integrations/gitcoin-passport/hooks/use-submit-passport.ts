import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAccount } from "wagmi"

import { useToast } from "@/lib/hooks/use-toast"
import { useEthersSigner } from "@/lib/hooks/web3/use-ethers-signer"

type SigningMessageResponse = {
  message: string
  nonce: string
}

export const useSubmitPassport = () => {
  const signer = useEthersSigner()
  const { address } = useAccount()
  const { toast, dismiss } = useToast()
  const handleToast = (err: string) => {
    toast({
      title: "Submit failed",
      description: err,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const signMessageMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/gitcoin-passport/signing-message")
      const data = await response.json()
      if (response.status === 200) {
        return data as SigningMessageResponse
      }
      if (data.detail) throw data.detail
      throw new Error(response.statusText)
    },
  })

  const submitPassportMutation = useMutation({
    mutationFn: async ({
      signature,
      nonce,
    }: {
      signature: string
      nonce: string
    }) => {
      if (!address) throw new Error("No address provided.")
      const response = await fetch("/api/gitcoin-passport/submit-passport", {
        method: "POST",
        body: JSON.stringify({
          address,
          signature,
          nonce,
        }),
      })
      const data = await response.json()
      if (response.status === 200) {
        return { success: true }
      }
      if (data.detail) throw data.detail
      throw new Error(response.statusText)
    },
  })

  const submitPassport = async () => {
    if (!signer) throw new Error("Ethers signer not provided.")
    const { message, nonce } = await signMessageMutation.mutateAsync()
    const signature = await signer.signMessage(message)
    const submitResult = await submitPassportMutation.mutateAsync({
      signature,
      nonce,
    })
    return submitResult
  }

  useEffect(() => {
    if (signMessageMutation.error ?? signMessageMutation.error)
      handleToast(
        String(signMessageMutation.error ?? signMessageMutation.error)
      )
  }, [signMessageMutation.error, signMessageMutation.error])

  return {
    submitPassport,
    isLoading:
      signMessageMutation.isLoading || submitPassportMutation.isLoading,
  }
}
