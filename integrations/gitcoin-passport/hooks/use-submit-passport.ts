import { useEthersSigner } from "@/lib/hooks/web3/use-ethers-signer"
import { useMutation } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import { GITCOIN_API_BASE_URL, GITCOIN_PASSPORT_API_KEY, GITCOIN_PASSPORT_SCORER_ID } from "../utils/constants"

type SigningMessageResponse = {
  message: string
  nonce: string
}

export const useSubmitPassport = () => {
  const signer = useEthersSigner()
  const { address } = useAccount()
  const signMessageMutation = useMutation({
    mutationFn: async () => {
      if (!GITCOIN_PASSPORT_API_KEY) throw new Error("Gitcoin passport api key not provided.")
      const response = await fetch(`${GITCOIN_API_BASE_URL}/signing-message`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': GITCOIN_PASSPORT_API_KEY,
        },
      }
      )
      const data = await response.json()
      if (response.status === 200) {
        return data as SigningMessageResponse
      }
      if (data.detail) throw data.detail
      throw new Error(response.statusText)
    }
  })

  const submitPassportMutation = useMutation({
    mutationFn: async ({ signature, nonce }: { signature: string; nonce: string }) => {
      if (!address) throw new Error("No address provided.")
      if (!GITCOIN_PASSPORT_API_KEY) throw new Error("Gitcoin passport api key not provided.")
      if (!GITCOIN_PASSPORT_SCORER_ID) throw new Error("Gitcoin passport scorer id not provided.")
      const response = await fetch(
        `${GITCOIN_API_BASE_URL}/submit-passport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': GITCOIN_PASSPORT_API_KEY,
        },
        body: JSON.stringify({
          address,
          community: GITCOIN_PASSPORT_SCORER_ID,
          signature,
          nonce
        })
      }
      )
      const data = await response.json()
      if (response.status === 200) {
        return { success: true }
      }
      if (data.detail) throw data.detail
      throw new Error(response.statusText)
    }
  })

  const submitPassport = async () => {
    if (!signer) throw new Error("Ethers signer not provided.")
    const { message, nonce } = await signMessageMutation.mutateAsync()
    const signature = await signer.signMessage(
      message
    )
    const submitResult = await submitPassportMutation.mutateAsync({ signature, nonce })
    return submitResult
  }

  return { submitPassport, isLoading: signMessageMutation.isLoading || submitPassportMutation.isLoading, error: signMessageMutation.error || signMessageMutation.error }
}
