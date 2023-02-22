import axios from 'axios'

export async function getAppUsers(_params?: BlockPagination): Promise<
  | {
      users?: Array<any>
    }
  | undefined
  | void
> {
  try {
    return await axios.get('/api/app/users')
  } catch (error: any) {
    throw error
  }
}
