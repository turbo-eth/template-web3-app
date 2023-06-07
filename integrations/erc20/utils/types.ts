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
  formfieldName: 'toAddress' | 'fromAddress' | 'amount'
  label: string
  type: string
  placeholder: string
  description: string
}
