import { Dot, Text, Button, GenericModal } from '@gnosis.pm/safe-react-components'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'

type DeleteBatchModalProps = {
  count: number
  onClick: () => void
  onClose: () => void
}

const DeleteBatchModal = ({ count, onClick, onClose }: DeleteBatchModalProps) => {
  return (
    <GenericModal
      title="Clear transaction list?"
      withoutBodyPadding
      body={
        <StyledModalBodyWrapper>
          <StyledModalDot color="tag">
            <Text size="xl" color="white">
              {count}
            </Text>
          </StyledModalDot>

          <StyledModalText size="xl">
            {`transaction${count > 1 ? 's' : ''}`} will be cleared
          </StyledModalText>
          <StyledModalButtonsWrapper
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxWidth={'450px'}
          >
            <Button size="md" variant="bordered" onClick={onClose}>
              Back
            </Button>
            <Button size="md" style={{ marginLeft: 16 }} color="error" onClick={onClick}>
              Yes, clear
            </Button>
          </StyledModalButtonsWrapper>
        </StyledModalBodyWrapper>
      }
      onClose={onClose}
    />
  )
}

export default DeleteBatchModal

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
