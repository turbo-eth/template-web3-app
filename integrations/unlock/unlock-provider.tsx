import { ethers } from 'ethers'

// TODO: update this to change based on network

const networks = {
  5: {
    unlockAddress: '0x627118a4fB747016911e5cDA82e2E77C531e8206', // Smart contracts docs include all addresses on all networks
    provider: 'https://rpc.unlock-protocol.com/5',
  },
}

export const provider = new ethers.providers.JsonRpcProvider(networks[5].provider)
