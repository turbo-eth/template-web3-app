import { GelatoConstants } from './types'

export const GELATO_CONSTANTS: GelatoConstants = {
  subgraphBaseUrl: 'https://api.thegraph.com/subgraphs/name/gelatodigital/poke-me',
  networks: {
    1: {
      graph: '',
      contract: '0xB3f5503f93d5Ef84b06993a1975B9D21B962892F',
    },
    137: {
      graph: 'polygon',
      contract: '0x527a819db1eb0e34426297b03bae11F2f8B3A19E',
    },
    250: {
      graph: 'fantom',
      contract: '0x6EDe1597c05A0ca77031cBA43Ab887ccf24cd7e8',
    },
    42161: {
      graph: 'arbitrum',
      contract: '0xB3f5503f93d5Ef84b06993a1975B9D21B962892F',
    },
    43114: {
      graph: 'avalanche',
      contract: '0x8aB6aDbC1fec4F18617C9B889F5cE7F28401B8dB',
    },
    56: {
      graph: 'bsc',
      contract: '0x527a819db1eb0e34426297b03bae11F2f8B3A19E',
    },
    25: {
      graph: 'cronos',
      contract: '0x86B7e611194978F556007ac1F52D09d114D8f160',
    },
    100: {
      graph: 'gnosis',
      contract: '0x8aB6aDbC1fec4F18617C9B889F5cE7F28401B8dB',
    },
    420: {
      graph: 'optimism',
      contract: '0x340759c8346A1E6Ed92035FB8B6ec57cE1D82c2c',
    },
    1284: {
      graph: 'moonbeam',
      contract: '0x6c3224f9b3feE000A444681d5D45e4532D5BA531',
    },
    1285: {
      graph: 'moonriver',
      contract: '0x86B7e611194978F556007ac1F52D09d114D8f160',
    },
    80001: {
      testnet: true,
      graph: 'mumbai',
      contract: '0xc1C6805B857Bef1f412519C4A842522431aFed39',
    },
    421613: {
      testnet: true,
      graph: 'arbitrum-goerli',
      contract: '0xa5f9b728ecEB9A1F6FCC89dcc2eFd810bA4Dec41',
    },
    5: {
      testnet: true,
      graph: 'goerli',
      contract: '0xc1C6805B857Bef1f412519C4A842522431aFed39',
    },
  },
}
