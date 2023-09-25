import { TextFieldInput } from '@gnosis.pm/safe-react-components'
import { TextFieldInputProps } from '@gnosis.pm/safe-react-components/dist/inputs/TextFieldInput'
import styled from 'styled-components'

type TextContractFieldTypes = TextFieldInputProps & {
  networkPrefix?: undefined | string
  getAddressFromDomain?: () => {}
}

const TextContractField = ({
  networkPrefix,
  getAddressFromDomain,
  ...props
}: TextContractFieldTypes) => {
  return <StyledTextField {...props} hiddenLabel={false} />
}

export default TextContractField

const StyledTextField = styled(TextFieldInput)`
  && {
    textarea {
      &.MuiInputBase-input {
        padding: 0;
      }
    }
  }
`
