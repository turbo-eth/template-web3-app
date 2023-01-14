/* eslint-disable unused-imports/no-unused-vars */

// @ts-ignore
export function createPermitSignature({ chainId, tokenAddress, owner, spender, value, nonce, deadline }: any) {
  const domain = {
    name: process.env.NEXT_PUBLIC_EIP_712_TOKEN,
    version: '1',
    chainId: chainId,
    verifyingContract: tokenAddress || '0x0000000000000000000000000000000000000000',
  } as const

  // The named list of all type definitions
  const types = {
    Permit: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
      {
        name: 'deadline',
        type: 'uint256',
      },
    ],
  } as const

  const data = {
    owner: owner,
    spender: spender,
    value: value,
    nonce: nonce || 0,
    deadline: deadline || 0,
  } as const

  return {
    domain,
    types,
    value: data,
    message: data,
  }
}
