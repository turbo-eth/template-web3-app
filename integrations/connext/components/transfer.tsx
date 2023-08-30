import Image from "next/image"
import { BsInfoCircle } from "react-icons/bs"
import { HiOutlineCheckCircle } from "react-icons/hi"
import { IoWarning } from "react-icons/io5"
import { TiArrowRight } from "react-icons/ti"

import { LinkComponent } from "@/components/shared/link-component"

import {
  calculateAmount,
  findAsset,
  findChain,
  findDecimals,
  formatTimestamp,
} from "../utils"
import { mainnetAssets, testnetAssets } from "../utils/assets"
import { mainnetChains, testnetChains } from "../utils/chains"
import type { Transfer } from "../utils/types"

type TransferProps = {
  isMainnet: boolean
  transfer: Transfer
}

function getStatusIcon(status: string, error_status: string) {
  const pending = !["Executed", "CompletedFast", "CompletedSlow"].includes(
    status as "Executed" | "CompletedFast" | "CompletedSlow"
  )
  const errored =
    error_status === "LowRelayerFee" &&
    ["XCalled", "Reconciled"].includes(status)

  if (errored) {
    return (
      <div className="flex flex-col items-center justify-center">
        <IoWarning
          className="3xl:w-10 3xl:h-10 text-red-500 dark:text-red-400"
          size={32}
        />
        <span className="text-xs font-bold text-red-500">{error_status}</span>
      </div>
    )
  } else if (pending) {
    return (
      <BsInfoCircle
        className="3xl:w-10 3xl:h-10 text-blue-500 dark:text-blue-400"
        size={26}
      />
    )
  }

  return (
    <HiOutlineCheckCircle
      className="3xl:w-10 3xl:h-10 text-green-500 dark:text-green-400"
      size={32}
    />
  )
}

export function Transfer({ isMainnet, transfer }: TransferProps) {
  const chains = isMainnet ? mainnetChains : testnetChains
  const assets = isMainnet ? mainnetAssets : testnetAssets

  const originChain = findChain(chains, transfer.origin_domain)
  const originAsset = findAsset(assets, transfer.origin_transacting_asset)

  const originDecimals = originAsset
    ? findDecimals(originAsset, transfer.origin_transacting_asset)
    : undefined

  const destinationChain = findChain(chains, transfer.destination_domain)
  const destinationAsset = findAsset(
    assets,
    transfer.destination_transacting_asset
  )
  const destinationDecimals = destinationAsset
    ? findDecimals(destinationAsset, transfer.destination_transacting_asset)
    : undefined

  return (
    <div className="3xl:w-96 mx-auto w-72">
      <div className="mx-auto max-w-xs rounded border-0 border-green-500 bg-slate-100 py-5 px-4 dark:bg-slate-900 sm:max-w-none">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-1.5">
            <Image
              alt={`${originChain?.name || "Chain"} logo`}
              className="3xl:w-6 3xl:h-6 rounded-full"
              height={20}
              src={
                originChain?.image ||
                "/integrations/connext/logos/chains/gnosis.png"
              }
              width={20}
            />
            <span className="3xl:text-xl text-xs font-medium">
              {originChain?.name}
            </span>
          </div>
          <div className="flex items-center justify-end space-x-1.5">
            <Image
              alt={`${destinationChain?.name || "Chain"} logo`}
              className="3xl:w-6 3xl:h-6 rounded-full"
              height={20}
              src={
                destinationChain?.image ||
                "/integrations/connext/logos/chains/gnosis.png"
              }
              width={20}
            />
            <span className="3xl:text-xl text-xs font-medium">
              {destinationChain?.name}
            </span>
          </div>
        </div>
        <div className="my-4 flex items-start justify-between space-x-2">
          <div className="flex flex-col space-y-1.5">
            <span className="3xl:text-xl text-sm">
              {calculateAmount(
                transfer.origin_transacting_amount,
                originDecimals || 18
              )}
            </span>
            <div className="flex items-center justify-start space-x-1">
              <Image
                alt={`${originAsset?.name || ""}`}
                className="3xl:w-5 3xl:h-5 rounded-full"
                height={16}
                src={
                  originAsset?.image ||
                  "/integrations/connext/logos/chains/gnosis.png"
                }
                width={16}
              />
              <span className="3xl:text-xl text-xs font-medium">
                {originAsset?.symbol}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <LinkComponent
              href={`https://${
                isMainnet ? "connextscan.io" : "testnet.connextscan.io"
              }/tx/${transfer.transfer_id}`}
              target="_blank"
            >
              {getStatusIcon(
                transfer.status || "",
                transfer.error_status || ""
              )}
            </LinkComponent>
          </div>
          <div className="flex flex-col items-end space-y-1.5">
            <span className="3xl:text-xl text-sm">
              {calculateAmount(
                transfer.destination_transacting_amount ??
                  transfer.origin_transacting_amount,
                destinationDecimals || 18
              )}
            </span>
            <div className="flex items-center justify-center space-x-1">
              <Image
                alt={`${destinationAsset?.name || ""}`}
                className="3xl:w-5 3xl:h-5 rounded-full"
                height={16}
                src={
                  destinationAsset?.image ||
                  "/integrations/connext/logos/chains/gnosis.png"
                }
                width={16}
              />
              <span className="3xl:text-xl text-xs font-medium">
                {destinationAsset?.symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-0.5 flex items-center justify-between">
          <span></span>
          <div className="flex items-center">
            <span className="3xl:text-xl text-xs font-medium text-slate-400 dark:text-slate-500">
              {formatTimestamp(transfer.xcall_timestamp)}
            </span>
          </div>
        </div>
        <div className="mt-1 -mb-2 flex items-center justify-end">
          <LinkComponent
            className="3xl:text-xl -mr-1 flex items-center space-x-0 text-xs font-medium text-blue-500 dark:text-blue-500"
            href={`https://${
              isMainnet ? "connextscan.io" : "testnet.connextscan.io"
            }/tx/${transfer.transfer_id}`}
            target="_blank"
          >
            <span>See more on explorer</span>
            <TiArrowRight
              className="3xl:w-5 3xl:h-5 mt-0.5 -rotate-45"
              size={16}
            />
          </LinkComponent>
        </div>
      </div>
    </div>
  )
}
