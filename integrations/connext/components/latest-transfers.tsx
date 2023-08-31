"use client"

import { useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { TiArrowRight } from "react-icons/ti"
import { useAccount } from "wagmi"

import { LinkComponent } from "@/components/shared/link-component"

import { useLatestTransfers } from "../hooks/use-latest-transfers"
import { Transfer } from "./transfer"

interface LatestTransfersProps {
  isMainnet: boolean
}

export function LatestTransfers({ isMainnet }: LatestTransfersProps) {
  const [collapse, setCollapse] = useState(false)
  const transfers = useLatestTransfers(isMainnet)
  const { address } = useAccount()

  const transfersComponent = () => {
    return transfers
      .slice(0, 3)
      .map((transfer, index) => (
        <Transfer key={index} isMainnet={isMainnet} transfer={transfer} />
      ))
  }

  return (
    <div className="lg:max-w-xs xl:ml-auto 2xl:max-w-sm">
      <button
        className={`flex w-full items-center justify-center ${
          collapse
            ? "font-medium text-muted hover:text-accent"
            : "font-semibold"
        } mb-3 space-x-1`}
        onClick={() => setCollapse(!collapse)}
      >
        <span className="3xl:text-2xl text-sm capitalize text-foreground">
          Latest Transfers
        </span>
        {collapse ? (
          <BiChevronDown
            className="3xl:w-6 3xl:h-6 text-foreground"
            size={18}
          />
        ) : (
          <BiChevronUp className="3xl:w-6 3xl:h-6 text-foreground" size={18} />
        )}
      </button>
      {!collapse && (
        <>
          <div className="3xl:gap-8 mx-auto grid max-w-xl gap-4 sm:grid-cols-1 lg:grid-cols-1">
            {transfersComponent()}
          </div>
          {address && transfers.length > 3 && (
            <LinkComponent
              className="3xl:text-2xl mt-2.5 flex items-center justify-center text-blue-500 dark:text-blue-200"
              href={`https://connextscan.io//address/${address}`}
              target="_blank"
            >
              <span className="font-medium">See more</span>
              <TiArrowRight
                className="3xl:w-6 3xl:h-6 mt-0.5 -rotate-45"
                size={18}
              />
            </LinkComponent>
          )}
        </>
      )}
    </div>
  )
}
