import { ethers } from 'ethers'

export type DecodedModule = {
  resolverAddress: string | null
  resolverData: string | null
  startTime: string | null
  interval: string | null
}

export const decodeModuleArgs = (args: string[], modules: number[]) => {
  let decoded: DecodedModule = {
    resolverAddress: null,
    resolverData: null,
    startTime: null,
    interval: null,
  }

  // resolver
  if (modules.includes(0)) {
    const arg = args[modules.indexOf(0)]
    const { resolverAddress, resolverData } = decodeResolverArgs(arg)
    decoded = { ...decoded, resolverAddress, resolverData }
  }
  //time
  if (modules.includes(1)) {
    const arg = args[modules.indexOf(1)]
    const { startTime, interval } = decodeTimeArgs(arg)
    decoded = { ...decoded, startTime, interval }
  }

  return decoded
}

export const decodeResolverArgs = (arg: string) => {
  const [resolverAddress, resolverData] = ethers.utils.defaultAbiCoder.decode(['address', 'bytes'], arg)
  return { resolverAddress, resolverData }
}

export const decodeTimeArgs = (arg: string) => {
  const [startTime, interval] = ethers.utils.defaultAbiCoder.decode(['uint128', 'uint128'], arg)

  return { startTime, interval }
}
