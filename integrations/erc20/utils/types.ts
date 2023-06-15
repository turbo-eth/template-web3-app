export type DeployType = {
  formfieldName: 'name' | 'symbol'
  label: string
  type: string
  placeholder: string
  description: string
}

export type writeMintType = {
  formfieldName: 'amount'
  label: string
  type: string
  placeholder: string
  description: string
}

export type writeTransferType = {
  formfieldName: 'to' | 'amount'
  label: string
  type: string
  placeholder: string
  description: string
}

export type storageType = {
  formfieldName: 'address'
  label: string
  type: string
  placeholder: string
  description: string
}
