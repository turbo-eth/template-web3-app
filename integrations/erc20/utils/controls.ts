import { DeployType, writeMintType, writeTransferType } from './types'

export const deployControls: DeployType[] = [
  { formfieldName: 'name', label: 'Name', placeholder: 'Name', description: 'This is the name of the deployable.' },
  { formfieldName: 'symbol', label: 'Symbol', placeholder: 'Symbol', description: 'This is the symbol of the deployable.' },
]

export const writeMintControls: writeMintType[] = [
  { formfieldName: 'amount', label: 'Amount', placeholder: 'Amount', description: 'This is the amount of the mintable.' },
]

export const writeTransferControls: writeTransferType[] = [
  { formfieldName: 'amount', label: 'Amount', placeholder: 'Amount', description: 'This is the amount of the mintable.' },
  { formfieldName: 'fromAddress', label: 'fromAddress', placeholder: 'fromAddress', description: 'This is the fromAddress of the mintable.' },
  { formfieldName: 'toAddress', label: 'toAddress', placeholder: 'toAddress', description: 'This is the toAddress of the mintable.' },
]
