import SafeApiKit from '@safe-global/api-kit'
import { SafeFactory } from '@safe-global/protocol-kit'
import { EthersAdapter } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'

export interface Client {
  service: object
  factory: SafeFactory
}

export async function getSafeClient({ safeOwner }: { safeOwner: ethers.providers.JsonRpcSigner }): Promise<Client> {
  const ethAdapter = new EthersAdapter({
    ethers,
    // Not sure how to fix types for the following line
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    signerOrProvider: safeOwner?.provider,
  })

  // TODO: figure out urls for dynamic networks
  const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter })

  const safeFactory = await SafeFactory.create({ ethAdapter })

  return { service: safeService, factory: safeFactory }
}
