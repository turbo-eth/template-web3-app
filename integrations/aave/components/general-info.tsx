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
      className="m-2 mb-4 flex items-start justify-start py-4 dark:text-white"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <div className="rounded border border-slate-200 p-5 dark:border-slate-600">
        <h3 className="text-lg font-normal">Select Chain</h3>
        <div className="mb-4 flex items-center">
          <div className="flex w-60 flex-col ">
            <Select
              value={chain?.id.toString()}
              onValueChange={(e) => switchNetwork?.(+e)}
            >
              <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent className="w-56 bg-white dark:bg-gray-700">
                {marketsData.map((market, index) => (
                  <SelectItem key={index} value={market.chainId.toString()}>
                    <div className="flex items-center justify-between">
                      <Image
                        alt={market.marketTitle}
                        className="mr-2 rounded-full"
                        height={30}
                        src={`/integrations/aave/logos/${market.marketTitle
                          .split(" ")[0]
                          .toLowerCase()}.png`}
                        width={30}
                      />
                      {market.marketTitle} Market
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mr-3 text-slate-500 dark:text-slate-300">
            <h3 className="mb-2">Net Worth</h3>
            <p className="font-bold text-black dark:text-white">
              <span className="text-slate-500 dark:text-slate-300">$ </span>
              {balanceInUsd > 0
                ? (balanceInUsd - totalDebtInUsd).toFixed(2)
                : "0"}
            </p>{" "}
          </div>
          <div className="mr-3 text-slate-500 dark:text-slate-300">
            <h3 className="mb-2">Net APY</h3>
            <p className="font-bold text-black dark:text-white">
              {balanceInUsd > 0 ? (
                <>
                  {averageNetApy.toFixed(2)}
                  <span className="text-slate-500 dark:text-slate-300"> %</span>
                </>
              ) : (
                "—"
              )}
            </p>{" "}
          </div>
          {totalDebtInUsd > 0 ? (
            <div className="mr-3 text-slate-500 dark:text-slate-300">
              <h3 className="mb-2">Health Factor</h3>
              <HealthFactor value={healthFactor} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
