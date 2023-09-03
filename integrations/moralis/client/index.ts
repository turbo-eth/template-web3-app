import { env } from "@/env.mjs"
import Moralis from "moralis"

;(async () => {
  // Initializes Moralis
  // This operation should run only once
  await Moralis.start({
    apiKey: env.MORALIS_API_KEY,
  })
})().catch((e) => console.error(e))

export function getMoralis() {
  try {
    if (!Moralis) throw new Error("Moralis not initialized")
    return Moralis
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)
  }
}
