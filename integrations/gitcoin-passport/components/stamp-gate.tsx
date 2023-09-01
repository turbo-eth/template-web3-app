import { FaLock } from "react-icons/fa"

import { useGetAddressStamps } from "../hooks/use-get-address-stamps"
import { StampGateProps } from "../utils/types"
import { Spinner } from "./spinner"

export const StampGate = ({ stampId, children, fallback }: StampGateProps) => {
  const { stamps, isLoading, error } = useGetAddressStamps()
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )
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
        <div className="flex flex-col items-center justify-center space-y-10">
          <FaLock fontSize={50} />
          <span>
            Please claim{" "}
            <span className="rounded-xl bg-green-100 px-2 py-1 font-mono font-semibold text-green-600 dark:bg-emerald-900 dark:text-emerald-100">
              {stampId}
            </span>{" "}
            stamp to be able to view this page
          </span>
        </div>
      )}
    </>
  )
}
