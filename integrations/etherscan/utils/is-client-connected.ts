import { AxiosInstance } from "axios"

import { VALID_API_URLS } from "./constants"

export function isClientConnected(client: AxiosInstance) {
  return (
    client &&
    client.defaults.baseURL &&
    VALID_API_URLS.includes(client.defaults.baseURL)
  )
}

export default isClientConnected
