import axios from 'axios'

import { env } from '@/env.mjs'

if (!env.WEB3_STORAGE_KEY) {
  throw new Error('No WEB3_STORAGE_KEY provided')
}

export const ipfsClient = axios.create({
  baseURL: 'https://api.web3.storage',
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${env.WEB3_STORAGE_KEY}`,
  },
})
