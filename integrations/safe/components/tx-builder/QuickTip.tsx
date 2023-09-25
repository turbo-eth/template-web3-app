import { Icon } from '@gnosis.pm/safe-react-components'
import MuiAlert from '@material-ui/lab/Alert'
import MuiAlertTitle from '@material-ui/lab/AlertTitle'
import React from 'react'
import styled from 'styled-components'

type QuickTipProps = {
  onClose: () => void
}

const QuickTip = ({ onClose }: QuickTipProps) => {
  return (
    <StyledAlert severity="success" onClose={onClose} icon={false}>
      <StyledTitle>Quick Tip</StyledTitle>
      You can save your batches in your transaction library{' '}
      <StyledIcon size="sm" type="bookmark" color="primary" aria-label="Save to Library" /> (local
      browser storage) or{' '}
      <StyledIcon size="sm" type="importImg" color="primary" aria-label="Download" /> download the
      .json file to use them later.
    </StyledAlert>
  )
}

const StyledAlert = styled(MuiAlert)`
  && {
    font-family: 'Averta';
    font-size: 14px;
    padding: 24px;
    background: #eaf7f4;
    color: #566976;
    border-radius: 8px;

    .MuiAlert-action {
      align-items: flex-start;
    }
  }
`

const StyledTitle = styled(MuiAlertTitle)`
  && {
    font-size: 14px;
    font-weight: bold;
  }
`

const StyledIcon = styled(Icon)`
  position: relative;
  top: 3px;
`

export default QuickTip
