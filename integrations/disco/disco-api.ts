import axios from 'axios'

export const discoAPI = axios.create({
  baseURL: 'https://api.disco.xyz/v1',
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${process.env.DISCO_API_KEY}`,
  },
})
