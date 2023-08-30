import { env } from "@/env.mjs"
import { atom, useAtom } from "jotai"

const livepeerApiKeyAtom = atom<string | undefined>(undefined)

export const useLivepeerApiKey = () => {
  const [livepeerApiKey, setLivepeerApiKey] = useAtom(livepeerApiKeyAtom)

  return [livepeerApiKey, setLivepeerApiKey] as const
}

export const useIsLivepeerApiKeySet = () => {
  const [livepeerApiKey] = useLivepeerApiKey()

  const envLivepeerApiKey = env.NEXT_PUBLIC_LIVEPEER_API_KEY

  return !!livepeerApiKey || !!envLivepeerApiKey
}
