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
  {
    formfieldName: 'fromAddress',
    label: 'Sender Address',
    placeholder: 'Type Sender Address',
    description: 'This is the Sender Address of the mintable.',
  },
  {
    formfieldName: 'toAddress',
    label: 'Receiver Address',
    placeholder: 'Type Receiver Address',
    description: 'This is the Receiver Address of the mintable.',
  },
]
