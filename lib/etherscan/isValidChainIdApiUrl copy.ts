export function isValidChainIdApiUrl(chain: number, validChainIds: any) {
  return validChainIds.includes(chain)
}

export default isValidChainIdApiUrl
