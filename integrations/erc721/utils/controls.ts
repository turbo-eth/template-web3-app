import { DeployType, approveType, storageType, writeMintType, writeTransferType } from './types'

export const deployControls: DeployType[] = [
  { formfieldName: 'name', type: 'input', label: 'Name', placeholder: 'Name', description: 'This is the name of the deployable.' },
  { formfieldName: 'symbol', type: 'input', label: 'Symbol', placeholder: 'Symbol', description: 'This is the symbol of the deployable.' },
]

export const writeMintControls: writeMintType[] = [
  { formfieldName: 'toAddress', type: 'input', label: 'To Address', placeholder: 'To Address' },
  { formfieldName: 'tokenId', type: 'input', label: 'Token Id', placeholder: 'Token Id' },
  { formfieldName: 'tokenUri', type: 'input', label: 'Token URI', placeholder: 'Token URI' },
]

export const approveControls: approveType[] = [
  { formfieldName: 'toAddress', type: 'input', label: 'To Address', placeholder: 'To Address' },
  { formfieldName: 'tokenId', type: 'input', label: 'Token Id', placeholder: 'Token Id' },
]

export const writeTransferControls: writeTransferType[] = [
  {
    formfieldName: 'toAddress',
    type: 'input',
    label: 'Receiver Address',
    placeholder: 'Type Receiver Address',
    description: 'This is the Receiver Address of the NFT.',
  },
  { formfieldName: 'tokenId', type: 'input', label: 'Token ID', placeholder: 'Token ID', description: 'This is the Token ID of the NFT.' },
]

export const writeTransferFromControls: writeTransferType[] = [
  {
    formfieldName: 'fromAddress',
    type: 'input',
    label: 'Sender Address',
    placeholder: 'Type Sender Address',
    description: 'This is the Sender Address of the NFT.',
  },
  {
    formfieldName: 'toAddress',
    type: 'input',
    label: 'Receiver Address',
    placeholder: 'Type Receiver Address',
    description: 'This is the Receiver Address of the NFT.',
  },
  { formfieldName: 'tokenId', type: 'input', label: 'Token ID', placeholder: 'Token ID', description: 'This is the Token ID of the NFT.' },
]

export const storageControls: storageType[] = [
  {
    formfieldName: 'address',
    type: 'input',
    label: 'Contract Address',
    placeholder: 'Contract Address',
    description: 'This is the Contract Address of the Stored ERC721.',
  },
]
