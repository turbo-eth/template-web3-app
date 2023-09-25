import { ButtonLink, EthHashInfo, Text, Title } from '@gnosis.pm/safe-react-components'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import useElementHeight from '../hooks/useElementHeight/useElementHeight'
import { ProposedTransaction } from '../typings/models'
import { weiToEther } from '../utils'

type TransactionDetailsProp = {
  transaction: ProposedTransaction
}

const TransactionDetails = ({ transaction }: TransactionDetailsProp) => {
  const { description, raw } = transaction

  const { to, value, data } = raw
  const {
    contractMethod,
    contractFieldsValues,
    customTransactionData,
    networkPrefix,
    nativeCurrencySymbol,
  } = description

  const isCustomHexDataTx = !!customTransactionData
  const isContractInteractionTx = !!contractMethod && !isCustomHexDataTx

  const isTokenTransferTx = !isCustomHexDataTx && !isContractInteractionTx

  return (
    <Wrapper>
      <StyledTxTitle size="md">
        {isTokenTransferTx
          ? `Transfer ${weiToEther(value)} ${nativeCurrencySymbol} to:`
          : 'Interact with:'}
      </StyledTxTitle>

      <EthHashInfo
        shortName={networkPrefix || ''}
        hash={to}
        showAvatar
        showCopyBtn
        shouldShowShortName
      />

      <TxSummaryContainer>
        {/* to address */}
        <Text size="xl" color="secondaryHover">
          to (address)
        </Text>
        <EthHashInfo
          shortName={networkPrefix || ''}
          hash={to}
          shortenHash={4}
          showCopyBtn
          shouldShowShortName
        />

        {/* value */}
        <Text size="xl" color="secondaryHover">
          value:
        </Text>
        <TxValueLabel>{`${weiToEther(value)} ${nativeCurrencySymbol}`}</TxValueLabel>

        {/* data */}
        <Text size="xl" color="secondaryHover">
          data:
        </Text>
        <TxValueLabel>{data}</TxValueLabel>

        {isContractInteractionTx && (
          <>
            {/* method */}
            <Text size="xl" color="secondaryHover">
              method:
            </Text>
            <StyledTxValueLabel size="xl">{contractMethod.name}</StyledTxValueLabel>

            {/* method inputs */}
            {contractMethod.inputs.map(({ name, type }, index) => {
              const inputName = name || index
              const inputLabel = `${inputName} (${type})`
              const inputValue = contractFieldsValues?.[inputName]
              return (
                <React.Fragment key={`${inputLabel}-${index}`}>
                  {/* input name */}
                  <StyledMethodNameLabel size="xl" color="secondaryHover" tooltip={inputLabel}>
                    {inputLabel}
                  </StyledMethodNameLabel>
                  {/* input value */}
                  <TxValueLabel>{inputValue}</TxValueLabel>
                </React.Fragment>
              )
            })}
          </>
        )}
      </TxSummaryContainer>
    </Wrapper>
  )
}

export default TransactionDetails

const Wrapper = styled.article`
  flex-grow: 1;
  padding: 0 16px;
  user-select: text;
`

const TxSummaryContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 5fr);
  gap: 4px;

  margin-top: 16px;
`

const StyledTxTitle = styled(Title)`
  font-size: 16px;
  margin: 8px 0;
  font-weight: bold;
  line-height: initial;
`

const StyledMethodNameLabel = styled(Text)`
  padding-left: 4px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LINE_HEIGHT = 22
const MAX_HEIGHT = 2 * LINE_HEIGHT // 2 lines as max height

const TxValueLabel = ({ children }: { children: React.ReactNode }) => {
  const [showMore, setShowMore] = useState(false)
  const [showEllipsis, setShowEllipsis] = useState(false)

  const { height: containerHeight, elementRef } = useElementHeight<HTMLDivElement>()

  // we show the Show more/less button if the height is more than 44px (the height of 2 lines)
  const showMoreButton = containerHeight && containerHeight > MAX_HEIGHT

  // we show/hide ellipsis at the end of the second line if user clicks on "Show more"
  useEffect(() => {
    if (showMoreButton && !showMore) {
      setShowEllipsis(true)
    }
  }, [showMoreButton, showMore])

  return (
    <div ref={elementRef}>
      {/* value */}
      <StyledTxValueLabel size="xl" showMore={showMore} showEllipsis={showEllipsis}>
        {children}
      </StyledTxValueLabel>

      {/* show more/less button */}
      {showMoreButton && (
        <StyledButtonLink color="primary" onClick={() => setShowMore(showMore => !showMore)}>
          {showMore ? 'Show less' : 'Show more'}
        </StyledButtonLink>
      )}
    </div>
  )
}

const StyledTxValueLabel = styled(Text).withConfig({
  shouldForwardProp: prop => !['showMore'].includes(prop) || !['showEllipsis'].includes(prop),
})<{ showMore?: boolean; showEllipsis?: boolean }>`
  max-height: ${({ showMore }) => (showMore ? '100%' : `${MAX_HEIGHT + 1}px`)};

  line-break: anywhere;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;

  ${({ showEllipsis, showMore }) =>
    !showMore &&
    showEllipsis &&
    `@supports (-webkit-line-clamp: 2) {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }`}
`

const StyledButtonLink = styled(ButtonLink)`
  padding: 0;

  && > p {
    margin 0;
  }

`
