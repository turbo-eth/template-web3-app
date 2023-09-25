import { ValidateResult } from 'react-hook-form'
import { toWei } from 'web3-utils'

import { isInputValueValid } from '../../../utils'

const INVALID_AMOUNT_ERROR = 'Invalid amount value'

const validateAmountField = (value: string): ValidateResult => {
  if (!isInputValueValid(value)) {
    return INVALID_AMOUNT_ERROR
  }

  // should be a valid amount in wei
  try {
    toWei(value)
  } catch (error) {
    return INVALID_AMOUNT_ERROR
  }
}

export default validateAmountField
