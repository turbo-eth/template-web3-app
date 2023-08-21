import { Abi, AbiFunction } from 'abitype'
import { ethers } from 'ethers'

import { GELATO_CONSTANTS } from './constants'

export const truncateEthAddress = (address: string, len?: number) => {
  len = len || 10

  if (address.length < 40) return address
  return `${address.slice(0, len - 4)}...${address.slice(-4)}`
}

export const formatFee = (fee: string) => {
  return (parseInt(fee) / 1e18).toFixed(2)
}

export const strLimit = (text: string, count: number) => {
  return text.slice(0, count) + (text.length > count ? '...' : '')
}

export const isValidAbi = (abi: string) => {
  try {
    JSON.parse(abi)
    return true
  } catch (e) {
    return false
  }
}

export const getAbiFunctions = (abi: Abi) => {
  return abi.filter((item) => item.type === 'function' && ['payable', 'nonpayable'].indexOf(item.stateMutability) !== -1) as AbiFunction[]
}

export const isJsonArray = (str: string) => {
  try {
    const res = JSON.parse(str)
    return Array.isArray(res)
  } catch (e) {
    return false
  }
}

export const validateInput = (name: string, value: string, selectedFunctionAbi: AbiFunction) => {
  if (value === '') return true

  const inputType = selectedFunctionAbi?.inputs.find((item) => item.name === name)?.type
  if (!inputType) return 'Invalid Input Type'

  const isArray = inputType.includes('[]')
  const isNumeric = inputType.startsWith('uint') || inputType.startsWith('int')
  const isAddress = inputType.startsWith('address')

  const errorMessages = {
    array: 'Invalid array - make sure your array is in a correct format, e.g. ["1", "2", "3"].',
    address: 'Invalid address - make sure argument is a correct Ethereum style address, e.g. "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2".',
    number: 'Invalid number - make sure your integer variable is correct.',
  }

  if (isArray) {
    if (!isJsonArray(value)) return errorMessages.array

    if (isAddress) {
      const isAddressArray = (JSON.parse(value) as string[]).reduce((acc, value) => acc && ethers.utils.isAddress(value), true)

      return isAddressArray || errorMessages.address
    }
    if (isNumeric) {
      const isNumericArray = (JSON.parse(value) as string[]).reduce((acc, value) => acc && parseInt(value) == (value as unknown), true)

      return isNumericArray || errorMessages.number
    }
  }

  if (isAddress) return ethers.utils.isAddress(value) || errorMessages.address
  if (isNumeric) return parseInt(value) == (value as unknown) || errorMessages.number

  return true
}

export const inputsAreFilled = (selectedFunctionAbi: AbiFunction, inputs: { [key: string]: string }) => {
  const functionInputs = selectedFunctionAbi.inputs.map((item) => item.name as string)

  return functionInputs.reduce((acc, item) => acc && !!inputs[item], true)
}

export const getFunctionSignature = (abi: string, func: string) => {
  const abiFunction = getAbiFunctions(JSON.parse(abi) as Abi).find((item) => item.name === func) as AbiFunction

  const parameterSignatures = abiFunction.inputs.map((item) => item.type).join(',')

  return `${abiFunction.name}(${parameterSignatures})`
}

export const getTotalInterval = (days: string, hours: string, minutes: string, seconds: string) => {
  const d = parseInt(days) || 0
  const h = parseInt(hours) || 0
  const m = parseInt(minutes) || 0
  const s = parseInt(seconds) || 0

  return s + m * 60 + h * 60 * 60 + d * 60 * 60 * 24
}

export const getTransactionUrl = (tx: ethers.ContractTransaction, chainId: number) => {
  const explorerUrl = GELATO_CONSTANTS.networks[chainId].explorerUrl

  return `${explorerUrl}/tx/${tx.hash}`
}

export const getAddressUrl = (address: string, chainId: number) => {
  const explorerUrl = GELATO_CONSTANTS.networks[chainId].explorerUrl

  return `${explorerUrl}/address/${address}`
}

export const sortInputsByOrder = (func: string, abi: string, inputs?: { [key: string]: string }) => {
  const abiFunction = getAbiFunctions(JSON.parse(abi) as Abi).find((item) => item.name === func) as AbiFunction

  return abiFunction.inputs.map((input) => {
    const value = (inputs || {})[input.name as string]
    if (input.type.startsWith('bytes')) {
      return ethers.utils.toUtf8Bytes(value)
    }
    return value
  })
}

export const getGqlEndpoint = (chainId: number) => {
  return chainId == 1 ? '' : `-${GELATO_CONSTANTS.networks[chainId].graph}`
}

export const getTaskFunctionData = (contractAddress: string, abi: string, execDataOrSelector: string) => {
  const contract = new ethers.Contract(contractAddress, abi)
  const functionSignature = execDataOrSelector.slice(0, 10)

  return {
    func: contract.interface.getFunction(functionSignature),
    data: contract.interface.decodeFunctionData(functionSignature, execDataOrSelector),
  }
}
