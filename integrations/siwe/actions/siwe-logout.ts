import axios, { AxiosError } from "axios"

export async function siweLogout(): Promise<boolean> {
  try {
    await axios.get("/api/siwe/logout")
    return true
  } catch (error) {
    if (error instanceof AxiosError === true) {
      return false
    }
    throw new Error(`Unexpected Error`)
  }
}
