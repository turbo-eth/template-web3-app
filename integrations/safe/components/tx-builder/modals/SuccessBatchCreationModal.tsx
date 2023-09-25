import { Dot, Text, Button, GenericModal, Title } from '@gnosis.pm/safe-react-components'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'

import { ReactComponent as SuccessBatchSVG } from '../../assets/success-batch.svg'

type SuccessBatchCreationModalProps = {
  count: number
  onClick: () => void
  onClose: () => void
}

const SuccessBatchCreationModal = ({ count, onClick, onClose }: SuccessBatchCreationModalProps) => {
  return (
    <GenericModal
      title="Batch Created!"
      withoutBodyPadding
      body={
        <StyledBodyWrapper
          display="flex"
          flexDirection={'column'}
          alignItems="center"
          justifyContent="center"
        >
          {/* Image Success */}
          <SuccessBatchSVG />

          {/* Title */}
          <StyledBodyTitle size="md">Success!</StyledBodyTitle>

          {/* Text */}
          <StyledTextWrapper>
            <StyledModalDot color="tag">
              <Text size="xl" color="white">
                {count}
              </Text>
            </StyledModalDot>

            <StyledModalText size="xl">Transaction Batch in the queue.</StyledModalText>

            <Text size="xl">You can now sign and execute it.</Text>
          </StyledTextWrapper>

          {/* Button */}
          <Button size="md" onClick={onClick}>
            Back to Tx Creation
          </Button>
        </StyledBodyWrapper>
      }
      onClose={onClose}
    />
  )
}

export default SuccessBatchCreationModal

const StyledBodyWrapper = styled(Box)`
  padding: 50px;
`

const StyledBodyTitle = styled(Title)`
  font-size: 32px;
  margin: 16px 0;
`

const StyledTextWrapper = styled.div`
  position: relative;
  margin-bottom: 32px;
`

const StyledModalDot = styled(Dot)`
  position: absolute;
  height: 24px;
  width: 24px;
  min-width: 24px;
  top: -1px;

  background-color: #566976;
`

const StyledModalText = styled(Text)`
  text-indent: 28px;
`
