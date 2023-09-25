import React from 'react'
import { Text, Button, GenericModal, EthHashInfo } from '@gnosis.pm/safe-react-components'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'

type Props = {
  networkPrefix: string
  implementationAddress: string
  blockExplorerLink: string
  onCancel: () => void
  onConfirm: () => void
}

const ImplementationABIDialog: React.FC<Props> = ({
  networkPrefix,
  implementationAddress,
  blockExplorerLink,
  onConfirm,
  onCancel,
}) => {
  return (
    <GenericModal
      title="Use the Implementation ABI?"
      withoutBodyPadding
      body={
        <StyledModalBodyWrapper>
          <Text size="xl">
            The contract looks like a proxy. Do you want to use the Implementation ABI?
          </Text>

          <StyledEthHashInfo
            shortName={networkPrefix || ''}
            hash={implementationAddress}
            explorerUrl={() => ({ url: blockExplorerLink, alt: blockExplorerLink })}
            showCopyBtn
            shouldShowShortName
            textSize="xl"
          />
          <StyledModalButtonsWrapper
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxWidth="470px"
          >
            <Button size="md" variant="bordered" onClick={onCancel}>
              Keep Proxy ABI
            </Button>
            <Button size="md" style={{ marginLeft: 16 }} color="primary" onClick={onConfirm}>
              Use Implementation ABI
            </Button>
          </StyledModalButtonsWrapper>
        </StyledModalBodyWrapper>
      }
      onClose={onCancel}
    />
  )
}

export { ImplementationABIDialog }

const StyledModalBodyWrapper = styled.div`
  position: relative;
  padding: 24px;
  max-width: 470px;
`

const StyledModalButtonsWrapper = styled(Box)`
  margin-top: 24px;
`

const StyledEthHashInfo = styled(EthHashInfo)`
  margin-top: 24px;

  p {
    font-weight: bold;
  }
`
