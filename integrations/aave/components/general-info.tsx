"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useNetwork, useSwitchNetwork } from "wagmi"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useAave } from "../hooks/use-aave"
import { marketsData } from "../utils/market-config"
import { HealthFactor } from "./health-factor"

export const GeneralInfo = () => {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const { balanceInUsd, totalDebtInUsd, healthFactor, averageNetApy } =
    useAave()

  return (
    <motion.div
      animate="show"
      className="m-2 mb-4 mr-auto flex items-start justify-start py-4"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <div className="rounded border p-5">
        <h3 className="text-lg">Select Chain</h3>
        <div className="mb-4 flex items-center">
          <div className="flex w-60 flex-col ">
            <Select
              value={chain?.id.toString()}
              onValueChange={(e) => switchNetwork?.(+e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent>
                {marketsData.map((market, index) => (
                  <SelectItem key={index} value={market.chainId.toString()}>
                    <div className="flex items-center justify-between">
                      <Image
                        src={`/integrations/aave/logos/${market.marketTitle
                          .split(" ")[0]
                          .toLowerCase()}.png`}
                        alt={market.marketTitle}
                        height={20}
                        width={20}
                        className="mr-2 rounded-full"
                      />
                      {market.marketTitle}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mr-3 text-muted-foreground">
            <h3 className="mb-2">Net Worth</h3>
            <p className="font-bold text-foreground">
              ${" "}
              {balanceInUsd > 0
                ? (balanceInUsd - totalDebtInUsd).toFixed(2)
                : "0"}
            </p>
          </div>
          <div className="mr-3 text-muted-foreground">
            <h3 className="mb-2">Net APY</h3>
            <p className="font-bold text-foreground">
              {balanceInUsd > 0 ? <>{averageNetApy.toFixed(2)}%</> : "—"}
            </p>
          </div>
          {totalDebtInUsd > 0 && (
            <div className="mr-3 text-muted-foreground">
              <h3 className="mb-2">Health Factor</h3>
              <HealthFactor value={healthFactor} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
