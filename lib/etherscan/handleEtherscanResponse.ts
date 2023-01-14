function handleEtherscanResponse(response: any) {
  if (response.status === '1') {
    return response.result
  }
  throw new Error(response.message)
}

export default handleEtherscanResponse
