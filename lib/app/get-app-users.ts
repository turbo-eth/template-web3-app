import axios from 'axios'

export async function getAppUsers(): Promise<
  | {
      users?: Array<any>
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.get('/api/app/users')
    return data
  } catch (error: any) {
    throw error
  }
}
