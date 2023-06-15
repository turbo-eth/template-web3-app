import { DeployType, storageType, writeMintType, writeTransferType } from './types'

export const deployControls: DeployType[] = [
  { formfieldName: 'name', type: 'input', label: 'Name', placeholder: 'Name', description: 'This is the name of the deployable.' },
  { formfieldName: 'symbol', type: 'input', label: 'Symbol', placeholder: 'Symbol', description: 'This is the symbol of the deployable.' },
]

export const writeMintControls: writeMintType[] = [
  { formfieldName: 'amount', type: 'input', label: 'Amount', placeholder: 'Amount', description: 'This is the amount of the mintable.' },
]

export const writeTransferControls: writeTransferType[] = [
  { formfieldName: 'amount', type: 'input', label: 'Amount', placeholder: 'Amount', description: 'This is the amount of the mintable.' },
  {
    formfieldName: 'to',
    type: 'input',
    label: 'Receiver Address',
    placeholder: 'Type Receiver Address',
    description: 'This is the Receiver Address of the mintable.',
  },
]

export const storageControls: storageType[] = [
  {
    formfieldName: 'address',
    type: 'input',
    label: 'Contract Address',
    placeholder: 'Contract Address',
    description: 'This is the Contract Address of the Stored ERC20.',
  },
]
