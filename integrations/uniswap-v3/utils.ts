export function formatUsd(value: string | number, digits = 2) {
  const amount = Number(value)

  if (!Number.isFinite(amount)) return "-"

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
  }).format(amount)
}

export function formatCompactNumber(value: string | number) {
  const amount = Number(value)

  if (!Number.isFinite(amount)) return "-"

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount)
}

export function formatSnapshotDate(timestamp: string) {
  const amount = Number(timestamp)

  if (!Number.isFinite(amount)) return "-"

  return new Date(amount * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export const FEATURED_BASE_TOKENS = [
  {
    address: "0x4200000000000000000000000000000000000006",
    label: "WETH",
  },
  {
    address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    label: "USDC",
  },
  {
    address: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf",
    label: "cbBTC",
  },
  {
    address: "0x940181a94a35a4569e4529a3cdfb74e38fd98631",
    label: "AERO",
  },
] as const
