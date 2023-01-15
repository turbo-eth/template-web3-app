function isValidAddress(address: string) {
  return address && address.length === 42 && address.startsWith('0x')
}

export default isValidAddress
