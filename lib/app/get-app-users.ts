import axios from 'axios'

import type { Users } from '@/app/api/app/users/route'

export async function getAppUsers() {
  try {
    const { data }: { data: Users } = await axios.get('/api/app/users')
    return data
  } catch (error) {
    throw error
  }
}
