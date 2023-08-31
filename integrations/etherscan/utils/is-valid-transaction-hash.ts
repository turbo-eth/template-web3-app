function isValidTransactionHash(hash: string): boolean {
  return typeof hash === "string" && hash.length === 64
}

export default isValidTransactionHash
