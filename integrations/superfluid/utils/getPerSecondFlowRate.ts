import { ethers } from 'ethers'

export const getPerSecondFlowRate = (monthlyAmount: string) => {
  const weiBigNumber = ethers.utils.parseEther(`${monthlyAmount}`)
  const wei = weiBigNumber.toString()
  const amount = +wei / 3600 / 24 / 30
  return `${amount.toFixed(0)}`
}

export const getPerMonthFlowRate = (flowPerSecond: string) => {
  const monthlyAmountWei = +flowPerSecond * 3600 * 24 * 30
  const monthlyAmount = ethers.utils.formatEther(`${monthlyAmountWei}`)
  return monthlyAmount
}

export const getWeiAmount = (amount: string) => {
  const weiBigNumber = ethers.utils.parseEther(amount)
  return weiBigNumber.toString()
}
