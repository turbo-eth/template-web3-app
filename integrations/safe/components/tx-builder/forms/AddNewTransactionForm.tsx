import { Title, Button } from '@gnosis.pm/safe-react-components'
import styled from 'styled-components'

import { ContractInterface } from '../../typings/models'
import { isValidAddress } from '../../utils'
import SolidityForm, {
  CONTRACT_METHOD_INDEX_FIELD_NAME,
  SolidityFormValuesTypes,
  TO_ADDRESS_FIELD_NAME,
  parseFormToProposedTransaction,
} from './SolidityForm'
import { useTransactions, useNetwork } from '../../store'

type AddNewTransactionFormProps = {
  contract: ContractInterface | null
  to: string
  showHexEncodedData: boolean
}

const AddNewTransactionForm = ({
  contract,
  to,
  showHexEncodedData,
}: AddNewTransactionFormProps) => {
  const initialFormValues = {
    [TO_ADDRESS_FIELD_NAME]: isValidAddress(to) ? to : '',
    [CONTRACT_METHOD_INDEX_FIELD_NAME]: '0',
  }

  const { addTransaction } = useTransactions()
  const { networkPrefix, getAddressFromDomain, nativeCurrencySymbol } = useNetwork()

  const onSubmit = (values: SolidityFormValuesTypes) => {
    const proposedTransaction = parseFormToProposedTransaction(
      values,
      contract,
      nativeCurrencySymbol,
      networkPrefix,
    )

    addTransaction(proposedTransaction)
  }

  return (
    <>
      <Title size="xs">Transaction information</Title>

      <SolidityForm
        id="solidity-contract-form"
        initialValues={initialFormValues}
        contract={contract}
        getAddressFromDomain={getAddressFromDomain}
        nativeCurrencySymbol={nativeCurrencySymbol}
        networkPrefix={networkPrefix}
        onSubmit={onSubmit}
        showHexEncodedData={showHexEncodedData}
      >
        <ButtonContainer>
          {/* Add transaction btn */}
          <Button size="md" color="primary" type="submit">
            Add transaction
          </Button>
        </ButtonContainer>
      </SolidityForm>
    </>
  )
}

export default AddNewTransactionForm

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`
