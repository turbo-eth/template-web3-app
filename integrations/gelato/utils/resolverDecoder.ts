import { ethers } from 'ethers'

export const decodeModuleArgs = (args: string[], modules: number[]) => {
  const decoded = {
    resolverAddress: null,
    resolverData: null,
    startTime: null,
    interval: null,
  }

  if (modules.includes(0)) {
    const arg = args[modules.indexOf(0)]
    const { resolverAddress, resolverData } = decodeResolverArgs(arg)
    return { ...decoded, resolverAddress, resolverData }
  }
}

export const decodeResolverArgs = (arg: string) => {
  const [resolverAddress, resolverData] = ethers.utils.defaultAbiCoder.decode(['address', 'bytes'], arg)
  return { resolverAddress, resolverData }
}
