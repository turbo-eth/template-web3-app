export const shorten = (address: string | undefined) => {
  if (!address) return ''
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`
}
