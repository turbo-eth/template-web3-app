import { GelatoConstants } from "./types"

export const GELATO_CONSTANTS: GelatoConstants = {
  subgraphBaseUrl:
    "https://api.thegraph.com/subgraphs/name/gelatodigital/poke-me",
  docs: {
    payment:
      "https://docs.gelato.network/developer-services/automate/paying-for-your-transactions",
    resolver:
      "https://docs.gelato.network/developer-services/automate/guides/custom-logic-triggers",
  },
  networks: {
    1: {
      graph: "",
      contract: "0x25aD59adbe00C2d80c86d01e2E05e1294DA84823",
      explorerApiUrl: "https://api.etherscan.io/api",
      explorerUrl: "https://etherscan.io",
      explorerApiKey: process.env.NEXT_PUBLIC_GELATO_SCAN_KEY_MAINNET as string,
    },
    137: {
      graph: "polygon",
      contract: "0x527a819db1eb0e34426297b03bae11F2f8B3A19E",
      explorerApiUrl: "https://api.polygonscan.com/api",
      explorerUrl: "https://polygonscan.com",
      explorerApiKey: process.env.NEXT_PUBLIC_GELATO_SCAN_KEY_POLYGON as string,
    },
    250: {
      graph: "fantom",
      contract: "0x6EDe1597c05A0ca77031cBA43Ab887ccf24cd7e8",
      explorerApiUrl: "https://api.ftmscan.com",
      explorerUrl: "https://ftmscan.com",
      explorerApiKey: process.env.NEXT_PUBLIC_GELATO_SCAN_KEY_FANTOM as string,
    },
    42161: {
      graph: "arbitrum",
      contract: "0xB3f5503f93d5Ef84b06993a1975B9D21B962892F",
      explorerApiUrl: "https://api.arbiscan.io/api",
      explorerUrl: "https://arbiscan.io",
      explorerApiKey: process.env
        .NEXT_PUBLIC_GELATO_SCAN_KEY_ARBITRUM as string,
    },
    43114: {
      graph: "avalanche",
      contract: "0x8aB6aDbC1fec4F18617C9B889F5cE7F28401B8dB",
      explorerApiUrl: "https://api.avascan.info/api",
      explorerUrl: "https://avascan.info",
      explorerApiKey: process.env
        .NEXT_PUBLIC_GELATO_SCAN_KEY_AVALANCHE as string,
    },
    56: {
      graph: "bsc",
      contract: "0x527a819db1eb0e34426297b03bae11F2f8B3A19E",
      explorerApiUrl: "https://api.bscscan.com/api",
      explorerUrl: "https://bscscan.com/",
      explorerApiKey: process.env.NEXT_PUBLIC_GELATO_SCAN_KEY_BSC as string,
    },
    25: {
      graph: "cronos",
      contract: "0x86B7e611194978F556007ac1F52D09d114D8f160",
      explorerApiUrl: "https://api.cronoscan.com/api",
      explorerUrl: "https://cronoscan.com",
      explorerApiKey: process.env.NEXT_PUBLIC_GELATO_SCAN_KEY_CRONOS as string,
    },
    100: {
      graph: "gnosis-chain",
      contract: "0x8aB6aDbC1fec4F18617C9B889F5cE7F28401B8dB",
      explorerApiUrl: "https://api.gnosisscan.io/api",
      explorerUrl: "https://gnosisscan.io",
      explorerApiKey: process.env.NEXT_PUBLIC_GELATO_SCAN_KEY_GNOSIS as string,
    },
    10: {
      graph: "optimism",
      contract: "0x340759c8346A1E6Ed92035FB8B6ec57cE1D82c2c",
      explorerApiUrl: "https://api-optimistic.etherscan.io/api",
      explorerUrl: "https://optimistic.etherscan.io/",
      explorerApiKey: process.env
        .NEXT_PUBLIC_GELATO_SCAN_KEY_OPTIMISM as string,
    },
    1284: {
      graph: "moonbeam",
      contract: "0x6c3224f9b3feE000A444681d5D45e4532D5BA531",
      explorerApiUrl: "https://api-moonbeam.moonscan.io/api",
      explorerUrl: "https://moonscan.io",
      explorerApiKey: process.env
        .NEXT_PUBLIC_GELATO_SCAN_KEY_MOONBEAM as string,
    },
    1285: {
      graph: "moonriver",
      contract: "0x86B7e611194978F556007ac1F52D09d114D8f160",
      explorerApiUrl: "https://api-moonriver.moonscan.io/api",
      explorerUrl: "https://moonriver.moonscan.io",
      explorerApiKey: process.env
        .NEXT_PUBLIC_GELATO_SCAN_KEY_MOONRIVER as string,
    },
    80001: {
      testnet: true,
      graph: "mumbai",
      contract: "0xc1C6805B857Bef1f412519C4A842522431aFed39",
      explorerApiUrl: "https://api-mumbai.polygonscan.com/api",
      explorerUrl: "https://mumbai.polygonscan.com",
      explorerApiKey:
        (process.env.NEXT_PUBLIC_GELATO_SCAN_KEY_MUMBAI as string) ||
        "TTE1XRYPE4MRFH2I18BPRSB172PRNBRPBS",
    },
    421613: {
      testnet: true,
      graph: "arbitrum-goerli",
      contract: "0xa5f9b728ecEB9A1F6FCC89dcc2eFd810bA4Dec41",
      explorerApiUrl: "https://api-goerli.arbiscan.io/api",
      explorerUrl: "https://goerli.arbiscan.io/",
      explorerApiKey: process.env
        .NEXT_PUBLIC_GELATO_SCAN_KEY_ARBITRUM_GOERLI as string,
    },
    5: {
      testnet: true,
      graph: "goerli",
      contract: "0xc1C6805B857Bef1f412519C4A842522431aFed39",
      explorerApiUrl: "https://goerli.etherscan.io/api",
      explorerUrl: "https://goerli.etherscan.io",
      explorerApiKey: process.env.NEXT_PUBLIC_GELATO_SCAN_KEY_GOERLI as string,
    },
  },
}
