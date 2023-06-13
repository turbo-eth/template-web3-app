import axios from 'axios'

import { env } from '@/env.mjs'

if (!env.DISCO_API_KEY) {
  throw new Error('No DISCO_API_KEY provided')
}

export const discoClient = axios.create({
  baseURL: 'https://api.disco.xyz/v1',
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${env.DISCO_API_KEY}`,
  },
})
