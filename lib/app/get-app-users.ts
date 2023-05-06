export async function getAppUsers(): Promise<
  | {
      users?: Array<any>
    }
  | undefined
  | void
> {
  try {
    const response = await fetch('/api/app/users')
    if (!response?.ok) throw new Error(response?.statusText)

    const data = await response.json()
    return data
  } catch (error: any) {
    throw error
  }
}
