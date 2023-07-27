export const truncateEthAddress = (address: string, len?: number) => {
  len = len || 10

  if (address.length < 40) return address
  return `${address.slice(0, len - 4)}...${address.slice(-4)}`
}

export const formatFee = (fee: string) => {
  return (parseInt(fee) / 1e18).toFixed(2)
}

export const strLimit = (text: string, count: number) => {
  return text.slice(0, count) + (text.length > count ? '...' : '')
}
