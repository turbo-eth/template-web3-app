export type DeployType = {
  formfieldName: 'name' | 'symbol'
  label: string
  placeholder: string
  description: string
}

export type writeMintType = {
  formfieldName: 'amount'
  label: string
  placeholder: string
  description: string
}

export type writeTransferType = {
  formfieldName: 'toAddress' | 'fromAddress' | 'amount'
  label: string
  placeholder: string
  description: string
}
