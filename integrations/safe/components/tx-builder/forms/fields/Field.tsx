import { ReactElement } from 'react'
import { Control, Controller } from 'react-hook-form'
import { SelectItem } from '@gnosis.pm/safe-react-components/dist/inputs/Select'

import {
  BOOLEAN_FIELD_TYPE,
  CONTRACT_METHOD_FIELD_TYPE,
  CUSTOM_TRANSACTION_DATA_FIELD_TYPE,
  isAddressFieldType,
  isBooleanFieldType,
} from './fields'
import AddressContractField from './AddressContractField'
import SelectContractField from './SelectContractField'
import TextareaContractField from './TextareaContractField'
import TextContractField from './TextContractField'
import validateField, { ValidationFunction } from '../validations/validateField'

const CUSTOM_DEFAULT_VALUES: CustomDefaultValueTypes = {
  [BOOLEAN_FIELD_TYPE]: 'true',
  [CONTRACT_METHOD_FIELD_TYPE]: '0', // first contract method as default
}

const BOOLEAN_DEFAULT_OPTIONS: SelectItem[] = [
  { id: 'true', label: 'True' },
  { id: 'false', label: 'False' },
]

const DEFAULT_OPTIONS: DefaultOptionTypes = {
  [BOOLEAN_FIELD_TYPE]: BOOLEAN_DEFAULT_OPTIONS,
}

interface CustomDefaultValueTypes {
  [key: string]: string
}

interface DefaultOptionTypes {
  [key: string]: SelectItem[]
}

type FieldProps = {
  fieldType: string
  control: Control<any, object>
  id: string
  name: string
  label: string
  fullWidth?: boolean
  required?: boolean
  validations?: ValidationFunction[]
  getAddressFromDomain?: (name: string) => Promise<string>
  networkPrefix?: string
  showErrorsInTheLabel?: boolean
  shouldUnregister?: boolean
  options?: SelectItem[]
}

const Field = ({
  fieldType,
  control,
  name,
  shouldUnregister = true,
  options,
  required = true,
  validations, // you can define extra validations as a prop
  ...props
}: FieldProps) => {
  // Component based on the field type
  const FieldComponent = getFieldComponent(fieldType)

  // see https://react-hook-form.com/advanced-usage#ControlledmixedwithUncontrolledComponents
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={CUSTOM_DEFAULT_VALUES[fieldType] || ''}
      shouldUnregister={shouldUnregister}
      rules={{
        required: {
          value: required,
          message: 'Required',
        },
        validate: validateField(fieldType, validations),
      }}
      render={({ field, fieldState }) => (
        <FieldComponent
          name={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          options={options || DEFAULT_OPTIONS[fieldType]}
          error={fieldState.error?.message}
          required={required}
          {...props}
        />
      )}
    />
  )
}

export default Field

// Returns a custom Field Component based on the field type
const getFieldComponent = (fieldType: string): ((props: any) => ReactElement) => {
  if (isAddressFieldType(fieldType)) {
    return AddressContractField
  }

  if (isBooleanFieldType(fieldType)) {
    return SelectContractField
  }

  if (fieldType === CONTRACT_METHOD_FIELD_TYPE) {
    return SelectContractField
  }

  if (fieldType === CUSTOM_TRANSACTION_DATA_FIELD_TYPE) {
    return TextareaContractField
  }

  // Textfield Component as fallback
  return TextContractField
}
