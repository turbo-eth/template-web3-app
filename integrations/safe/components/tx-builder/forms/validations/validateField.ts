import { Validate, ValidateResult } from 'react-hook-form'
import { toWei } from 'web3-utils'
import {
  NATIVE_AMOUNT_FIELD_TYPE,
  CUSTOM_TRANSACTION_DATA_FIELD_TYPE,
  isAddressFieldType,
  isBooleanFieldType,
  BASIC_UINT_FIELD_TYPE,
} from '../fields/fields'
import basicSolidityValidation from './basicSolidityValidation'
import validateAddressField from './validateAddressField'
import validateAmountField from './validateAmountField'
import validateBooleanField from './validateBooleanField'
import validateHexEncodedDataField from './validateHexEncodedDataField'

export type ValidationFunction = (value: string, fieldType: string) => ValidateResult

// added unit validation to the amount field (amount values are equivalent to uints)
const uintBasicValidation = (value: string): ValidateResult =>
  basicSolidityValidation(toWei(value), BASIC_UINT_FIELD_TYPE)

const validateField = (
  fieldType: string,
  extraValidations: ValidationFunction[] = [],
): Validate<string> => {
  return (value: string): ValidateResult =>
    [
      ...getFieldValidations(fieldType), // validations based on the field type
      basicSolidityValidation, // basic solidity field validation
      ...extraValidations, // extra validations
    ].reduce<ValidateResult>(
      (error, validation) => {
        return error || validation(value, fieldType)
      },
      undefined, // initially no error is present
    )
}

export default validateField

const getFieldValidations = (fieldType: string): ValidationFunction[] => {
  if (isAddressFieldType(fieldType)) {
    return [validateAddressField]
  }

  if (isBooleanFieldType(fieldType)) {
    return [validateBooleanField]
  }

  if (fieldType === CUSTOM_TRANSACTION_DATA_FIELD_TYPE) {
    return [validateHexEncodedDataField]
  }

  if (fieldType === NATIVE_AMOUNT_FIELD_TYPE) {
    return [validateAmountField, uintBasicValidation]
  }

  // no custom validations as a fallback
  return []
}
