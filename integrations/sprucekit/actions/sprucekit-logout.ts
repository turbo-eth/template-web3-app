import axios, { AxiosError } from 'axios'

export async function spruceKitLogout(): Promise<boolean> {
  try {
    await axios.get('/api/ssx/ssx-logout')
    return true
  } catch (error) {
    if (error instanceof AxiosError === true) {
      return false
    }
    throw new Error(`Unexpected Error`)
  }
}
