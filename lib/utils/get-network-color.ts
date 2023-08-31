export function GetNetworkColor(chain?: string) {
  if (chain === "homestead") return "green"
  if (chain === "arbitrum") return "blue"
  if (chain === "optimism") return "red"
  if (chain === "matic") return "purple"
  if (chain === "goerli") return "yellow"

  return "gray"
}
