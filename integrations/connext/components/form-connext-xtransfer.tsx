'use client'
import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MdOutlineSwapHoriz } from 'react-icons/md'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

import { mainnetAssets, testnetAssets } from '../utils/assets'
import { mainnetChains, testnetChains } from '../utils/chains'

const optimismDomainId = '1869640809'
const arbitrumDomainId = '1634886255'

const optimismGoerliDomainId = '1735356532'
const arbitrumGoerliId = '1734439522'

export function FormConnextXTransfer() {
  const [isMainnet, setIsMainnet] = useState(true)
  const [originChain, setOriginChain] = useState(optimismDomainId)
  const [destinationChain, setDestinationChain] = useState(arbitrumDomainId)
  const [asset, setAsset] = useState('eth')
  const [amount, setAmount] = useState<string>()
  const [estimatedFees, setEstimatedFees] = useState('0')
  const [estimatedTime, setEstimatedTime] = useState('5 minutes')

  const getAssetSymbol = () => {
    return (
      (isMainnet
        ? mainnetAssets.find((mainnetAsset) => mainnetAsset.id === asset)?.symbol
        : testnetAssets.find((testnetAsset) => testnetAsset.id === asset)?.symbol) || 'ETH'
    )
  }

  const swapChains = () => {
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

  return (
    <div className="w-full">
      <IsWalletConnected>
        <div className="w-full">
          <motion.div
            animate="show"
            className="card my-8 mx-auto max-w-fit dark:bg-gray-800"
            initial="hidden"
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
                              <Image alt="Disco logo" className="mr-2 rounded-full" height={20} src={chain.image} width={20} />
                              {chain.name}
                            </div>
                          </SelectItem>
                        ))
                      : testnetChains.map((chain, index) => (
                          <SelectItem key={index} value={chain.domain_id}>
                            <div className="flex items-center justify-between">
                              <Image alt="Disco logo" className="mr-2 rounded-full" height={20} src={chain.image} width={20} />
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
                              <Image alt="Disco logo" className="mr-2 rounded-full" height={20} src={chain.image} width={20} />
                              {chain.name}
                            </div>
                          </SelectItem>
                        ))
                      : testnetChains.map((chain, index) => (
                          <SelectItem key={index} value={chain.domain_id}>
                            <div className="flex items-center justify-between">
                              <Image alt="Disco logo" className="mr-2 rounded-full" height={20} src={chain.image} width={20} />
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
                Balance: <span className="font-bold">0 WETH</span>{' '}
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
              <input
                className="3xl:text-2xl w-36 rounded  border-0 bg-transparent py-1.5 text-right font-semibold focus:ring-0 sm:w-48 sm:text-lg"
                placeholder="0.00"
                type="text"
                value={amount}
                onChange={(e) => {
                  const regex = /^[0-9.,\b]+$/
                  let value = e.target.value
                  if (value === '' || regex.test(value)) {
                    // If value starts with a decimal separator, prepend with '0'.
                    if (value.startsWith('.') || value.startsWith(',')) {
                      value = `0${value}`
                    }
                    // Replace commas with points for JavaScript processing.
                    value = value.replace(',', '.')
                    // Store the input value in state.
                    setAmount(value)
                  }
                }}
              />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-slate-200">You receive</span>
              <span className="text-sm text-gray-600 dark:text-slate-200">
                Balance: <span className="font-bold">0 WETH</span>{' '}
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
            <div className="mt-5 rounded border border-slate-200 py-2 dark:border-gray-700">
              <div className="mt-2 flex items-center justify-between">
                <span className="ml-3 text-sm text-gray-600 dark:text-slate-200">Estimated fees</span>
                <span className="mr-3 text-sm text-gray-600 dark:text-slate-200">{`${estimatedFees} ${getAssetSymbol()}`}</span>
              </div>
              <div className="mt-4 mb-2 flex items-center justify-between">
                <span className="ml-3 text-sm text-gray-600 dark:text-slate-200">Estimated time</span>
                <span className="mr-3 text-sm text-gray-600 dark:text-slate-200">{estimatedTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="flex items-center justify-center gap-10">
          <WalletConnect />
        </div>
      </IsWalletDisconnected>
    </div>
  )
}
