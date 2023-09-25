import { FixedIcon, Icon, Text, Title, Tooltip } from '@gnosis.pm/safe-react-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import {
  CREATE_BATCH_PATH,
  EDIT_BATCH_PATH,
  HOME_PATH,
  SAVE_BATCH_PATH,
  TRANSACTION_LIBRARY_PATH,
} from '../routes/routes'
import { useTransactionLibrary } from '../store'
import ChecksumWarning from './ChecksumWarning'
import ErrorAlert from './ErrorAlert'

const HELP_ARTICLE_LINK = 'https://help.safe.global/en/articles/40841-transaction-builder'

const goBackLabel: Record<string, string> = {
  [CREATE_BATCH_PATH]: 'Back to Transaction Creation',
  [TRANSACTION_LIBRARY_PATH]: 'Back to Your Transaction Library',
  [EDIT_BATCH_PATH]: 'Back to Edit Batch',
  [SAVE_BATCH_PATH]: 'Back to Transaction Creation',
}

type LocationType = {
  state: { from: string } | null
}

const Header = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  const { batches } = useTransactionLibrary()

  const isTransactionCreationPath = pathname === CREATE_BATCH_PATH
  const isSaveBatchPath = pathname === SAVE_BATCH_PATH

  const showTitle = isTransactionCreationPath || isSaveBatchPath
  const showLinkToLibrary = isTransactionCreationPath || isSaveBatchPath

  const { state } = useLocation() as LocationType

  const previousUrl = state?.from || CREATE_BATCH_PATH

  return (
    <>
      <HeaderWrapper>
        {showTitle ? (
          <>
            {/* Transaction Builder Title */}
            <StyledTitle size="xl">Transaction Builder</StyledTitle>
            <Tooltip
              placement="top"
              title="Help Article"
              backgroundColor="primary"
              textColor="white"
              arrow
            >
              <a href={HELP_ARTICLE_LINK} target="_blank" rel="noreferrer">
                <Icon size="md" type="info" />
              </a>
            </Tooltip>
          </>
        ) : (
          <StyledLink to={HOME_PATH} onClick={goBack}>
            {/* Go Back link */}
            <FixedIcon type={'chevronLeft'} />
            <StyledLeftLinkLabel size="xl">{goBackLabel[previousUrl]}</StyledLeftLinkLabel>
          </StyledLink>
        )}

        {showLinkToLibrary && (
          <RigthLinkWrapper>
            <StyledLink to={TRANSACTION_LIBRARY_PATH}>
              <StyledRightLinkLabel size="xl">{`(${batches.length}) Your transaction library`}</StyledRightLinkLabel>
              <FixedIcon type={'chevronRight'} />
            </StyledLink>
          </RigthLinkWrapper>
        )}
      </HeaderWrapper>
      <ErrorAlert />
      <ChecksumWarning />
    </>
  )
}

export default Header

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e3e3;
  z-index: 10;
  background-color: white;
  height: 70px;
  padding: 0 40px;
  box-sizing: border-box;
`

const StyledTitle = styled(Title)`
  font-size: 20px;
  margin: 0 10px 0 0;
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #000000;
  font-size: 16px;
  text-decoration: none;
`

const StyledLeftLinkLabel = styled(Text)`
  margin-left: 8px;
`

const RigthLinkWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`

const StyledRightLinkLabel = styled(Text)`
  margin-right: 8px;
`
