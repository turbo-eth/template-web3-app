import { FaLock } from "react-icons/fa"

import { Skeleton } from "@/components/ui/skeleton"

import { useGetAddressStamps } from "../hooks/use-get-address-stamps"
import { useGetStampsMetadata } from "../hooks/use-get-stamps-metadata"
import { StampGateProps } from "../utils/types"
import { StampCard } from "./stamp-card"

export const StampGate = ({ stampId, children, fallback }: StampGateProps) => {
  const { stamps, isLoading, error } = useGetAddressStamps()
  const { stamps: allAvailableStamps } = useGetStampsMetadata()
  const gateStamp = allAvailableStamps?.find(
    (stamp) =>
      stamp.id === stampId ||
      stamp.groups.find((stampGroup) =>
        stampGroup.stamps.find((sgs) => sgs.name === stampId)
      )
  )
  if (isLoading) return <Skeleton className="h-10 w-full" />
  if (error) return <div className="text-red-500">{String(error)}</div>
  if (
    stamps?.find(
      (stamp) => stamp.provider === stampId || stamp.items.includes(stampId)
    )
  )
    return <>{children}</>
  return (
    <>
      {fallback ?? (
        <div className="flex flex-col items-center justify-center space-y-10 rounded-md border-2 p-4 pt-8">
          <FaLock fontSize={50} />
          <span>
            Please claim{" "}
            <span className="rounded-xl bg-green-100 px-2 py-1 font-mono font-semibold text-green-600 dark:bg-emerald-900 dark:text-emerald-100">
              {stampId}
            </span>{" "}
            stamp to be able to view this page.
            <StampCard
              className="mx-auto mt-6 max-w-[300px]"
              stamp={gateStamp}
              addressStamps={stamps}
              addressStampsLoading={isLoading}
            />
          </span>
        </div>
      )}
    </>
  )
}
