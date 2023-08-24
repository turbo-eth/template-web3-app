import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"

import { starterABI } from "./abis/starter-abi"

export default defineConfig({
  out: "./integrations/starter/generated/starter-wagmi.ts",
  contracts: [
    {
      name: "starter",
      abi: starterABI,
    },
  ],
  plugins: [react()],
})
