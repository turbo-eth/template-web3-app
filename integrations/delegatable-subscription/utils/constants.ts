import type { Address } from "viem"

/**
 * Default configuration constants for Delegatable subscription management.
 */
export const DELEGATABLE_SUBSCRIPTION_DEFAULTS = {
  CONTRACT_NAME: "ERC20PermitSubscriptions",
  CONTRACT_VERSION: "1",
  ENFORCER_NAME: "DistrictERC20PermitSubscriptionsEnforcer",
  DEFAULT_ENFORCER_ADDRESS:
    "0x9A676e781A523b5d0C0e43731313A708CB607508" as Address,
  DEFAULT_VERIFYING_CONTRACT:
    "0x0B306BF915C4d645ff596e518fAf3F9669b97016" as Address,
  DEFAULT_TOKEN_ADDRESS:
    "0x4200000000000000000000000000000000000042" as Address,
  DEFAULT_SUB_PERIOD: 1800,
  DEFAULT_SUB_AMOUNT: "1",
  DEFAULT_TOTAL_AMOUNT: "12",
  DEFAULT_DEADLINE_DAYS: 365,
}

export const PERIOD_PRESETS = [
  { label: "30 Seconds (Test)", value: 30 },
  { label: "5 Minutes", value: 300 },
  { label: "30 Minutes", value: 1800 },
  { label: "1 Hour", value: 3600 },
  { label: "1 Day", value: 86400 },
  { label: "1 Week", value: 604800 },
  { label: "30 Days", value: 2592000 },
] as const
