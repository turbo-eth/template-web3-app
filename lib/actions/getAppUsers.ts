import kyUniversal from 'ky-universal'

export async function getAppUsers(_params?: BlockPagination): Promise<
  | {
      users?: Array<any>
    }
  | undefined
  | void
> {
  try {
    return await kyUniversal('/api/app/users').json()
  } catch (error: any) {
    throw error
  }
}
