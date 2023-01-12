import axios, { AxiosError } from 'axios'

export async function siweLogout(): Promise<boolean> {
  try {
    await axios.get('/api/account/logout')
    document.cookie = 'TurboETH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    return true
  } catch (error: any) {
    if (error instanceof AxiosError == true) {
      return false
    }
    throw new Error(`Unexpected Error`)
  }
}
