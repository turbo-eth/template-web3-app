import { EtherscanApiTransactionsResponse } from "./types"

function handleEtherscanResponse(response: EtherscanApiTransactionsResponse) {
  if (response.status === "1") {
    return response.result
  }
  throw new Error(response.message)
}

export default handleEtherscanResponse
