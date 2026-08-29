import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"

import { delegatableABI } from "./abis/delegatable-abi"
import { districtERC20PermitSubscriptionsEnforcerABI } from "./abis/district-erc20-permit-subscriptions-enforcer-abi"
import { verifyingContractERC20PermitSubscriptionsABI } from "./abis/verifying-contract-erc20-permit-subscriptions-abi"

export default defineConfig({
  out: "./integrations/delegatable-subscription/generated/delegatable-wagmi.ts",
  contracts: [
    {
      name: "delegatable",
      abi: delegatableABI,
    },
    {
      name: "districtERC20PermitSubscriptionsEnforcer",
      abi: districtERC20PermitSubscriptionsEnforcerABI,
    },
    {
      name: "verifyingContractERC20PermitSubscriptions",
      abi: verifyingContractERC20PermitSubscriptionsABI,
    },
  ],
  plugins: [react()],
})
