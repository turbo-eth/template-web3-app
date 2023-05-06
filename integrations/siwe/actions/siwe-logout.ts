export async function siweLogout(): Promise<boolean> {
  try {
    const response = await fetch('/api/siwe/logout')
    if (!response?.ok) throw new Error(response?.statusText)
    return true
  } catch (error: unknown) {
    if (error instanceof Error == true) {
      return false
    }
    throw new Error(`Unexpected Error`)
  }
}
