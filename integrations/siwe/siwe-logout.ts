import axios, { AxiosError } from 'axios'

export async function siweLogout(): Promise<boolean> {
  try {
    await axios.get('/api/account/logout')
    return true
  } catch (error: any) {
    if (error instanceof AxiosError == true) {
      return false
    }
    throw new Error(`Unexpected Error`)
  }
}
