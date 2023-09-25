import { Dot, Text, Button, GenericModal } from '@gnosis.pm/safe-react-components'
import Box from '@material-ui/core/Box'

import styled from 'styled-components'
import { Batch } from '../../typings/models'

type DeleteBatchFromLibraryProps = {
  batch: Batch
  onClick: (batch: Batch) => void
  onClose: () => void
}

const DeleteBatchFromLibrary = ({ batch, onClick, onClose }: DeleteBatchFromLibraryProps) => {
  return (
    <GenericModal
      title="Delete batch from the library?"
      withoutBodyPadding
      body={
        <StyledModalBodyWrapper>
          <StyledModalDot color="tag">
            <Text size="xl" color="white">
              {batch.transactions.length}
            </Text>
          </StyledModalDot>

          <StyledModalText size="xl">{`${batch.name} batch will be permanently deleted`}</StyledModalText>
          <StyledModalButtonsWrapper
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxWidth={'450px'}
          >
            <Button size="md" variant="bordered" onClick={onClose}>
              Back
            </Button>
            <Button
              size="md"
              style={{ marginLeft: 16 }}
              color="error"
              onClick={() => onClick(batch)}
            >
              Yes, delete
            </Button>
          </StyledModalButtonsWrapper>
        </StyledModalBodyWrapper>
      }
      onClose={onClose}
    />
  )
}

export default DeleteBatchFromLibrary

const StyledModalBodyWrapper = styled.div`
  position: relative;
  padding: 24px;
  max-width: 450px;
`

const StyledModalDot = styled(Dot)`
  height: 24px;
  width: 24px;
  min-width: 24px;
  background-color: #566976;

  position: absolute;
  top: 22px;
`

const StyledModalText = styled(Text)`
  text-indent: 30px;
`

const StyledModalButtonsWrapper = styled(Box)`
  margin-top: 24px;
`
