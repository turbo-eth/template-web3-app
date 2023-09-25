import { useRef } from 'react'
import { ButtonLink, Icon, Text } from '@gnosis.pm/safe-react-components'
import { alpha } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles'

import { ReactComponent as CreateNewBatchSVG } from '../assets/add-new-batch.svg'
import useDropZone from '../hooks/useDropZone'
import { useMediaQuery } from '@material-ui/core'

type CreateNewBatchCardProps = {
  onFileSelected: (file: File | null) => void
}

const CreateNewBatchCard = ({ onFileSelected }: CreateNewBatchCardProps) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const fileRef = useRef<HTMLInputElement | null>(null)
  const { isOverDropZone, isAcceptError, dropHandlers } = useDropZone((file: File | null) => {
    onFileSelected(file)
  }, '.json')

  const handleFileSelected = (event: any) => {
    event.preventDefault()
    if (event.target.files.length) {
      onFileSelected(event.target.files[0])
      event.target.value = ''
    }
  }

  const handleBrowse = function (event: any) {
    event.preventDefault()
    fileRef.current?.click()
  }

  return (
    <Wrapper isSmallScreen={isSmallScreen}>
      <Hidden smDown>
        <CreateNewBatchSVG />
      </Hidden>
      <StyledDragAndDropFileContainer
        {...dropHandlers}
        dragOver={isOverDropZone}
        fullWidth={isSmallScreen}
        error={isAcceptError}
      >
        {isAcceptError ? (
          <StyledText size={'xl'} error={isAcceptError}>
            The uploaded file is not a valid JSON file
          </StyledText>
        ) : (
          <>
            <Icon type="termsOfUse" size="sm" />
            <StyledText size={'xl'}>Drag and drop a JSON file or</StyledText>
            <StyledButtonLink color="primary" onClick={handleBrowse}>
              choose a file
            </StyledButtonLink>
          </>
        )}
      </StyledDragAndDropFileContainer>
      <input
        ref={fileRef}
        id="logo-input"
        type="file"
        onChange={handleFileSelected}
        accept=".json"
        hidden
      />
    </Wrapper>
  )
}

export default CreateNewBatchCard

const Wrapper = styled.div<{ isSmallScreen: boolean }>`
  margin-top: ${({ isSmallScreen }) => (isSmallScreen ? '0' : '64px')};
`

const StyledDragAndDropFileContainer = styled.div<{
  dragOver: Boolean
  fullWidth: boolean
  error: Boolean
}>`
  box-sizing: border-box;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '420px')};
  border: 2px dashed ${({ theme, error }) => (error ? theme.colors.error : '#008c73')};
  border-radius: 8px;
  background-color: ${({ theme, error }) => (error ? alpha(theme.colors.error, 0.7) : '#eaf7f4')};
  padding: 24px;
  margin: 24px auto 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ dragOver, error, theme }) => {
    if (dragOver) {
      return `
        transition: all 0.2s ease-in-out;
        transform: scale(1.05);
      `
    }

    return `
      border-color: ${error ? theme.colors.error : '#008c73'};
      background-color: ${error ? alpha(theme.colors.error, 0.7) : '#eaf7f4'};
    `
  }}
`

const StyledText = styled(Text)<{ error?: Boolean }>`
  margin-left: 4px;
  color: ${({ error }) => (error ? '#FFF' : '#566976')};
`

const StyledButtonLink = styled(ButtonLink)`
  padding: 0;
  text-decoration: none;

  && > p {
    font-size: 16px;
  }
`
