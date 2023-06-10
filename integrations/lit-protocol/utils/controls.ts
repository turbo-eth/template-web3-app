import { supportedChains } from './config'

export const litControls = [
  {
    formfieldName: 'searchKey',
    label: 'ID:',
    component: 'input',
    placeholder: 'Search addresses...',

    attribute: { type: 'text' },
  },
]

export const singleAddressControls = [
  {
    formfieldName: 'singleAdd',
    label: 'Wallet Address:',
    component: 'input',
    placeholder: '0x1234567890123456789012345678901234567890',

    attribute: { type: 'text' },
  },
]

export const SingleNFtControls = [
  {
    formfieldName: 'chain',
    label: 'Select Chain',
    component: 'select',
  },
  {
    formfieldName: 'singleNftAdd',
    label: 'ERC721 Contract Address:',
    component: 'input',
    placeholder: '0x1234567890123456789012345678901234567890',

    attribute: { type: 'text' },
  },
  {
    formfieldName: 'tokenId',
    label: 'Token ID:',
    component: 'input',
    placeholder: '0',

    attribute: { type: 'text' },
  },
]

export const GroupTokenControls = [
  {
    formfieldName: 'chain',
    label: 'Select Chain',
    component: 'select',
    options: supportedChains || [],
  },
  {
    formfieldName: 'tokenType',
    label: 'Select Chain',
    component: 'select',
    options: ['erc20', 'erc721', 'erc1155'],
  },
  {
    formfieldName: 'address',
    label: 'Contract Address:',
    component: 'input',
    placeholder: '0x1234567890123456789012345678901234567890',

    attribute: { type: 'text' },
  },
  {
    formfieldName: 'amount',
    label: 'Token Amount:',
    component: 'input',
    placeholder: '0',

    attribute: { type: 'text' },
  },
  {
    formfieldName: 'tokenId',
    label: 'Token ID:',
    component: 'input',
    placeholder: '0',

    attribute: { type: 'text' },
  },
  {
    formfieldName: 'decimals',
    label: 'Decimals',
    component: 'input',
    placeholder: '0',

    attribute: { type: 'text' },
  },
]

export const litEncryptControls = [
  {
    formfieldName: 'encryptMessage',
    label: 'Message:',
    component: 'textArea',
    placeholder: '0x1234567890123456789012345678901234567890',

    attribute: { type: 'text' },
  },
]
