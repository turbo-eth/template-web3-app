import type { Address } from 'viem'

export function parseAddresses(input: string | undefined): Address[] {
  if (!input) return []
  // Split by comma, then map over the results and trim whitespace from each address
  return input
    .split(',')
    .map((address) => address.trim() as Address)
    .filter((address) => address.length > 0)
}
