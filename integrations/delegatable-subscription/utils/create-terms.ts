import { encodePacked, type Address } from "viem"

/**
 * Encodes terms for DistrictERC20PermitSubscriptionsEnforcer
 * Format: abi.encodePacked(verifierAddress, salt)
 *
 * @param verifier Verifying contract address (20 bytes)
 * @param salt Salt byte / number (uint8)
 * @returns Packed bytecode hex string
 */
export function encodeSubscriptionTerms(
  verifier: Address,
  salt: number | bigint = 1
): `0x${string}` {
  return encodePacked(["address", "uint8"], [verifier, Number(salt)])
}

/**
 * Parses terms back to verifier address and salt
 */
export function decodeSubscriptionTerms(terms: `0x${string}`): {
  verifier: Address
  salt: number
} {
  const cleanTerms = terms.startsWith("0x") ? terms.slice(2) : terms
  const verifierHex: Address = `0x${cleanTerms.slice(0, 40)}`
  const saltHex = cleanTerms.slice(40, 42)
  const salt = saltHex ? parseInt(saltHex, 16) : 0
  return {
    verifier: verifierHex,
    salt,
  }
}
