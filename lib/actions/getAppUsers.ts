import ky from 'ky'

export async function getAppUsers(_params?: BlockPagination): Promise<
  | {
      users?: Array<any>
    }
  | undefined
  | void
> {
  try {
    return await ky('/api/app/users').json()
  } catch (error: any) {
    throw error
  }
}
