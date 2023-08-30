"use client"

import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GeneralInfo } from "@/integrations/aave/components/general-info"
import { ListAssetsToBorrow } from "@/integrations/aave/components/list-assets-to-borrow"
import { ListAssetsToSupply } from "@/integrations/aave/components/list-assets-to-supply"
import { ListBorrowedAssets } from "@/integrations/aave/components/list-borrowed-assets"
import { ListSuppliedAssets } from "@/integrations/aave/components/list-supplied-assets"
import { useAave } from "@/integrations/aave/hooks/use-aave"

export default function AaveHome() {
  const [actionSelected, setActionSelected] = useState("supply")
  const { chainSupported } = useAave()

  return chainSupported ? (
    <section className="w-full lg:mt-10">
      <div className="mx-auto max-w-screen-xl">
        <GeneralInfo />
        <div className="m-2 mb-5 w-40 xl:hidden">
          <Select
            value={actionSelected}
            onValueChange={(action) => setActionSelected(action)}
          >
            <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
              <SelectValue placeholder="Select market" />
            </SelectTrigger>
            <SelectContent className="w-56 bg-white dark:bg-gray-700">
              <SelectItem value="supply">
                <div className="flex items-center justify-between">Supply</div>
              </SelectItem>
              <SelectItem value="borrow">
                <div className="flex items-center justify-between">Borrow</div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 flex justify-between dark:text-white">
          <div
            className={`${
              actionSelected === "supply" ? "" : "hidden"
            } m-2 w-full xl:block`}
          >
            <ListSuppliedAssets />
          </div>
          <div
            className={`${
              actionSelected === "borrow" ? "" : "hidden"
            } m-2 w-full xl:block`}
          >
            <ListBorrowedAssets />
          </div>
        </div>

        <div className="flex justify-between dark:text-white ">
          <div
            className={`${
              actionSelected === "supply" ? "" : "hidden"
            } m-2 w-full xl:block`}
          >
            <ListAssetsToSupply />
          </div>
          <div
            className={`${
              actionSelected === "borrow" ? "" : "hidden"
            } m-2 w-full xl:block`}
          >
            <ListAssetsToBorrow />
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="w-full lg:mt-10">
      <div className="mx-auto max-w-screen-xl">
        <h1 className=" mt-5 text-center text-2xl">Chain not supported</h1>
        <GeneralInfo />
      </div>
    </section>
  )
}
