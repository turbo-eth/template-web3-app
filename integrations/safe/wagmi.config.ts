import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"

import { erc1155ABI } from "./artifacts/core/erc1155-abi"

export default defineConfig({
  out: "./integrations/generated/erc1155-wagmi.ts",
  contracts: [
    {
      name: "erc1155",
      abi: erc1155ABI,
    },
  ],
  plugins: [react()],
})
