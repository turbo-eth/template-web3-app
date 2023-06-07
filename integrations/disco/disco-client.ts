import axios from 'axios'

import { env } from '@/env.mjs'

export const discoClient = axios.create({
  baseURL: 'https://api.disco.xyz/v1',
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${env.NEXT_PUBLIC_DISCO_API_KEY}`,
  },
})
