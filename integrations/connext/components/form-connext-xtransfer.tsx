'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MdOutlineSwapHoriz } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { formatUnits, parseUnits } from 'viem'
import { useAccount, useBalance, useNetwork, useSendTransaction, useSwitchNetwork } from 'wagmi'

import WalletConnectCustom from '@/components/blockchain/wallet-connect-custom'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

import { Spinner } from './spinner'
import { useApproveIfNeeded } from '../hooks/use-approve-if-needed'
import { useEstimatedAmount } from '../hooks/use-estimated-amount'
import { useEstimatedRelayerFee } from '../hooks/use-estimated-relayer-fee'
import { useLatestTransfers } from '../hooks/use-latest-transfers'
import { useSupportedTransfer } from '../hooks/use-supported-transfer'
import { useXcall } from '../hooks/use-xcall'
import { mainnetAssets, testnetAssets } from '../utils/assets'
import { mainnetChains, testnetChains } from '../utils/chains'
import { arbitrumDomainId, arbitrumGoerliId, optimismDomainId, optimismGoerliDomainId } from '../utils/constants'
import { Asset } from '../utils/types'

interface FormConnextXTransferProps {
  isMainnet: boolean
  setIsMainnet: Dispatch<SetStateAction<boolean>>
}

export function FormConnextXTransfer({ isMainnet, setIsMainnet }: FormConnextXTransferProps) {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { isLoading: isSwitchingChain, switchNetwork } = useSwitchNetwork()

  const [originChain, setOriginChain] = useState(optimismDomainId)
  const [destinationChain, setDestinationChain] = useState(arbitrumDomainId)
  const [asset, setAsset] = useState('eth')
  const [amount, setAmount] = useState<string>('')
  const [showTransferStatus, setShowTransferStatus] = useState(false)
  const [contractApproved, setContractApproved] = useState(false)

  const getChain = (domainId: string) => {
    return isMainnet
      ? mainnetChains.find((mainnetChain) => mainnetChain.domain_id == domainId)
      : testnetChains.find((testnetChain) => testnetChain.domain_id == domainId)
  }
  const getAsset = (): Asset | undefined => {
    return isMainnet
      ? mainnetAssets.find((mainnetAsset) => mainnetAsset.id === asset)
      : testnetAssets.find((testnetAsset) => testnetAsset.id === asset)
  }
  const { data: originBalance } = useBalance({
    address,
    token: getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.contract_address as `0x${string}`,
    chainId: getChain(originChain)?.chain_id ?? 1,
    watch: true,
  })
  const { data: destinationBalance } = useBalance({
    address,
    token: getAsset()?.contracts.find((contract) => contract.chain_id === getChain(destinationChain)?.chain_id)?.contract_address as `0x${string}`,
    chainId: getChain(destinationChain)?.chain_id ?? 1,
    watch: true,
  })

  const transferSupported = useSupportedTransfer({
    originChainId: getChain(originChain)?.chain_id,
    destinationChainId: getChain(destinationChain)?.chain_id,
    assetDataContracts: getAsset()?.contracts,
  })

  const {
    estimatedAmount,
    isFastPath,
    isLoading: isFetchingEstimatedAmount,
  } = useEstimatedAmount({
    isMainnet,
    originDomain: getChain(originChain)?.domain_id,
    destinationDomain: getChain(destinationChain)?.domain_id,
    originTokenAddress: getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.contract_address,
    amount: parseUnits(
      `${Number(amount)}`,
      getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.decimals ?? 18
    ).toString(),
  })

  const estimatedRelayerFee = useEstimatedRelayerFee({
    isMainnet,
    originDomain: getChain(originChain)?.domain_id,
    destinationDomain: getChain(destinationChain)?.domain_id,
  })

  const { request: approveRequest, isLoading: isApproveCheckLoading } = useApproveIfNeeded({
    isMainnet,
    originDomain: getChain(originChain)?.domain_id,
    assetAddress: getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.contract_address,
    amount: parseUnits(
      `${Number(amount)}`,
      getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.decimals ?? 18
    ).toString(),
  })

  const { request: xcallRequest, isLoading: xcallLoading } = useXcall({
    isMainnet,
    origin: getChain(originChain)?.domain_id,
    destination: getChain(destinationChain)?.domain_id,
    asset: getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.contract_address,
    to: address,
    relayerFee: estimatedRelayerFee,
    amount: parseUnits(
      `${Number(amount)}`,
      getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.decimals ?? 18
    ).toString(),
  })

  const transfers = useLatestTransfers(isMainnet)

  const { isLoading: txLoading, isSuccess: txSuccess, reset: txReset, sendTransaction } = useSendTransaction(xcallRequest)
  const {
    isLoading: approveTxLoading,
    isSuccess: approveTxSuccess,
    reset: approveTxReset,
    sendTransaction: approveSendTransaction,
  } = useSendTransaction(approveRequest)

  const isInOriginChain = () => {
    return chain?.id === getChain(originChain)?.chain_id
  }

  const swapChains = async () => {
    const temp = originChain
    setOriginChain(destinationChain)
    setDestinationChain(temp)
  }

  const updateOriginChain = (domainId: string) => {
    if (domainId == destinationChain) return swapChains()
    setOriginChain(domainId)
  }

  const updateDestinationChain = (domainId: string) => {
    if (domainId == originChain) return swapChains()
    setDestinationChain(domainId)
  }

  const sendTx = () => {
    if (approveRequest && !contractApproved) {
      setContractApproved(true)
      return approveSendTransaction?.()
    }
    if (xcallRequest) {
      sendTransaction?.()
    }
  }

  const getButtonContent = () => {
    const originChainData = getChain(originChain)

    if (!isInOriginChain()) {
      if (isSwitchingChain) {
        return (
          <div className="flex items-center justify-center">
            <span>Switching...</span>
            <Image alt={originChainData?.image ?? ''} className="ml-2 rounded-full" height={20} src={originChainData?.image ?? ''} width={20} />
          </div>
        )
      } else {
        return (
          <div className="flex items-center justify-center">
            <span>Switch network</span>
            <Image alt={originChainData?.image ?? ''} className="ml-2 rounded-full" height={20} src={originChainData?.image ?? ''} width={20} />
          </div>
        )
      }
    }

    if (approveTxLoading) {
      return (
        <div className="flex items-center justify-center">
          <span>Approve contract...</span>
        </div>
      )
    }

    if (txLoading || txSuccess) {
      return (
        <div className="flex items-center justify-center">
          <span>{txLoading ? 'Confirm transaction...' : 'Processing...'}</span>
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center" onClick={sendTx}>
        <span>Send</span>
      </div>
    )
  }

  const buttonAction = () => {
    const originChainData = getChain(originChain)

    if (!isInOriginChain()) {
      switchNetwork?.(originChainData?.chain_id)
    }
  }

  const getButton = () => {
    if (
      isInOriginChain() &&
      parseUnits(
        `${Number(amount)}`,
        getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.decimals ?? 18
      ) > (originBalance?.value ?? 0)
    ) {
      return (
        <button
          disabled
          className="3xl:text-xl mt-3 flex w-full items-center justify-start rounded bg-red-400 p-4 text-sm font-medium text-white dark:bg-red-500">
          Insufficient balance :(
        </button>
      )
    }
    if (
      (!xcallRequest || xcallLoading || isApproveCheckLoading || !amount || txLoading || txSuccess || approveTxLoading || amount === '0') &&
      isInOriginChain()
    ) {
      return (
        <button disabled className="mt-5 w-full cursor-not-allowed rounded bg-slate-100 p-4 text-gray-400 dark:bg-slate-800 dark:text-white">
          {getButtonContent()}
        </button>
      )
    }

    return (
      <button className="mt-5 w-full rounded bg-blue-600 p-4 text-white" disabled={txLoading} onClick={buttonAction}>
        {getButtonContent()}
      </button>
    )
  }

  function formatNumber(numberStr: string): string {
    const number = parseFloat(numberStr)
    const decimals = getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.decimals ?? 18

    if (isNaN(number) || number === 0) {
      return '0.00'
    }

    const formattedNumber = number.toFixed(decimals + 6)

    const [integerPart, decimalPart] = formattedNumber.split('.')

    if (decimalPart === '00') {
      return `${integerPart}.${decimalPart.slice(0, 2)}`
    }

    return formattedNumber.slice(0, -decimals)
  }

  useEffect(() => {
    if (isMainnet) {
      setOriginChain(optimismDomainId)
      setDestinationChain(arbitrumDomainId)
      setAsset('eth')
    } else {
      setOriginChain(optimismGoerliDomainId)
      setDestinationChain(arbitrumGoerliId)
      setAsset('test')
    }
  }, [isMainnet])

  useEffect(() => {
    setContractApproved(false)
  }, [originChain, destinationChain, asset])

  useEffect(() => {
    if (txSuccess) {
      setShowTransferStatus(true)
      txReset()
      approveTxReset()
    }
  }, [transfers])

  useEffect(() => {
    if (approveTxSuccess) {
      approveTxReset()
    }
  }, [approveTxSuccess])

  return showTransferStatus ? (
    <div className="space-y-4 rounded border bg-slate-50 px-4 pt-5 pb-6 dark:border-slate-700 dark:bg-slate-900 sm:px-6 sm:pt-5 sm:pb-6">
      <div className="flex items-center justify-between space-x-2">
        <span className="text-lg font-semibold">Transfer status</span>
        <button onClick={() => setShowTransferStatus(false)}>
          <RxCross2 height={20} width={20} />
        </button>
      </div>
      <Image alt="Penguin" className="w-full" height={400} src="/penguin-working.gif" width={400} />
      <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-500 sm:text-sm">
        Your transfer is on his way. You can close this window and the transaction will still be processed
      </p>
    </div>
  ) : (
    <motion.div
      animate="show"
      className="card my-8 mx-4 max-w-fit dark:bg-gray-800 sm:mx-auto"
      initial="hidden"
      style={{ boxShadow: `${`${getChain(originChain)?.color ?? 'ffffff'}33`} 0px 16px 128px 64px` }}
      variants={FADE_DOWN_ANIMATION_VARIANTS}>
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl">Bridge</h2>
        <div className="flex items-center justify-between">
          <label className="mr-3" htmlFor="networks-switch">
            {isMainnet ? 'Mainnet' : 'Testnet'}
          </label>
          <Switch checked={isMainnet} id="networks-switch" onCheckedChange={setIsMainnet}></Switch>
        </div>
      </div>

      <div className="mb-10 flex items-center justify-between">
        <div className="flex w-40 flex-col">
          <span className="text-sm text-gray-600 dark:text-slate-200">From</span>
          <Select value={originChain} onValueChange={updateOriginChain}>
            <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-200 dark:placeholder:text-neutral-400">
              <SelectValue placeholder="Select chain" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700">
              {isMainnet
                ? mainnetChains.map((chain, index) => (
                    <SelectItem key={index} value={chain.domain_id}>
                      <div className="flex items-center justify-between">
                        <Image alt={`${chain.name} logo`} className="mr-2 rounded-full" height={20} src={chain.image} width={20} />
                        {chain.name}
                      </div>
                    </SelectItem>
                  ))
                : testnetChains.map((chain, index) => (
                    <SelectItem key={index} value={chain.domain_id}>
                      <div className="flex items-center justify-between">
                        <Image alt={`${chain.name} logo`} className="mr-2 rounded-full" height={20} src={chain.image} width={20} />
                        {chain.name}
                      </div>
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
        <button className="mx-4 mt-8  flex items-center justify-center text-3xl" onClick={swapChains}>
          <MdOutlineSwapHoriz />
        </button>
        <div className="flex w-40 flex-col">
          <span className="text-sm text-gray-600 dark:text-slate-200">To</span>
          <Select value={destinationChain} onValueChange={updateDestinationChain}>
            <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-200 dark:placeholder:text-neutral-400">
              <SelectValue placeholder="Select chain" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700">
              {isMainnet
                ? mainnetChains.map((chain, index) => (
                    <SelectItem key={index} value={chain.domain_id}>
                      <div className="flex items-center justify-between">
                        <Image alt={`${chain.name} logo`} className="mr-2 rounded-full" height={20} src={chain.image} width={20} />
                        {chain.name}
                      </div>
                    </SelectItem>
                  ))
                : testnetChains.map((chain, index) => (
                    <SelectItem key={index} value={chain.domain_id}>
                      <div className="flex items-center justify-between">
                        <Image alt={`${chain.name} logo`} className="mr-2 rounded-full" height={20} src={chain.image} width={20} />
                        {chain.name}
                      </div>
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-slate-200">You send</span>
        <span className="text-sm text-gray-600 dark:text-slate-200">
          Balance:{' '}
          <span className="font-bold">
            {formatNumber(originBalance?.formatted ?? '')} {getAsset()?.symbol}
          </span>{' '}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between rounded border border-slate-200 dark:border-gray-700">
        <div className="flex w-48 flex-col border-none">
          <Select value={asset} onValueChange={setAsset}>
            <SelectTrigger className="input border-none text-gray-600 placeholder:text-neutral-400 dark:bg-gray-800 dark:text-slate-200 dark:placeholder:text-neutral-400">
              <SelectValue placeholder="Select chain" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700">
              {isMainnet
                ? mainnetAssets.map((asset, index) => (
                    <SelectItem key={index} value={asset.id}>
                      <div className="flex items-center justify-between">
                        <Image alt={`${asset.name} logo`} className="mr-2 rounded-full" height={20} src={asset.image} width={20} />
                        {asset.symbol}
                      </div>
                    </SelectItem>
                  ))
                : testnetAssets.map((asset, index) => (
                    <SelectItem key={index} value={asset.id}>
                      <div className="flex items-center justify-between">
                        <Image alt={`${asset.name} logo`} className="mr-2 rounded-full" height={20} src={asset.image} width={20} />
                        {asset.symbol}
                      </div>
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
        <input
          className="3xl:text-2xl w-36 rounded  border-0 bg-transparent py-1.5 text-right font-semibold focus:ring-0 sm:w-48 sm:text-lg"
          placeholder="0.00"
          type="text"
          value={amount}
          onChange={(e) => {
            const regex = /^[0-9.,\b]+$/
            let value = e.target.value
            if (value === '' || regex.test(value)) {
              if (value.startsWith('.') || value.startsWith(',')) {
                value = `0${value}`
              }
              value = value.replace(',', '.')
              setAmount(value)
            }
          }}
        />
      </div>
      {transferSupported ? (
        <>
          {' '}
          <div className="mt-8 flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-slate-200">You receive</span>
            <span className="text-sm text-gray-600 dark:text-slate-200">
              Balance:{' '}
              <span className="font-bold">
                {formatNumber(destinationBalance?.formatted ?? '0')} {getAsset()?.symbol}
              </span>{' '}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between rounded border border-slate-200 dark:border-gray-700">
            <div className="flex w-48 flex-col border-none">
              <Select disabled value={asset}>
                <SelectTrigger className="input border-none text-gray-600 placeholder:text-neutral-400 dark:bg-gray-800 dark:text-slate-200 dark:placeholder:text-neutral-400">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  {isMainnet
                    ? mainnetAssets.map((asset, index) => (
                        <SelectItem key={index} value={asset.id}>
                          <div className="flex items-center justify-between">
                            <Image alt="Disco logo" className="mr-2 rounded-full" height={20} src={asset.image} width={20} />
                            {asset.symbol}
                          </div>
                        </SelectItem>
                      ))
                    : testnetAssets.map((asset, index) => (
                        <SelectItem key={index} value={asset.id}>
                          <div className="flex items-center justify-between">
                            <Image alt="Disco logo" className="mr-2 rounded-full" height={20} src={asset.image} width={20} />
                            {asset.symbol}
                          </div>
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mr-3">
              {isFetchingEstimatedAmount && amount ? (
                <Spinner className="justify-end" />
              ) : (
                formatUnits(
                  BigInt(estimatedAmount),
                  getAsset()?.contracts.find((contract) => contract.chain_id === getChain(originChain)?.chain_id)?.decimals ?? 18
                )
              )}
            </div>
          </div>
          <div className="mt-5 rounded border border-slate-200 py-2 dark:border-gray-700">
            <div className="my-2 flex items-center justify-between">
              <span className="ml-3 text-sm text-gray-600 dark:text-slate-200">Estimated time</span>
              {isFastPath ? (
                <span className="mr-2 text-green-500 dark:text-green-500">{'< 4 minutes'}</span>
              ) : (
                <span className="mr-2 text-yellow-500 dark:text-yellow-500">{'< 90 minutes'}</span>
              )}
            </div>
          </div>{' '}
        </>
      ) : (
        <div className="3xl:text-2xl mt-6 mb-2 text-center font-medium text-slate-400 dark:text-slate-200">Route not supported</div>
      )}
      <IsWalletConnected>{getButton()}</IsWalletConnected>
      <IsWalletDisconnected>
        <WalletConnectCustom className="mt-5 w-full rounded bg-blue-600 p-4" classNameConnect="w-full bg-blue-600 text-white" />
      </IsWalletDisconnected>
    </motion.div>
  )
}
