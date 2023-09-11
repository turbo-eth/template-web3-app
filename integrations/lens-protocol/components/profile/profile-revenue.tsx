import { ProfileId, useProfileFollowRevenue } from "@lens-protocol/react-web"

import { Skeleton } from "@/components/ui/skeleton"

export const ProfileRevenue = ({ profileId }: { profileId: ProfileId }) => {
  const { data, loading: revenueLoading } = useProfileFollowRevenue({
    profileId,
  })
  return (
    <div className="mt-4 w-full border-t-2 pt-4 dark:border-neutral-800">
      <h2 className="text-xs font-semibold">Profile Revenue</h2>
      {data?.map((revenue) => {
        const { asset } = revenue.totalAmount
        return (
          <div
            key={asset.address}
            className="mt-3 flex flex-row items-center justify-center font-mono md:justify-start"
          >
            <span className="text-green-700 dark:text-green-400">
              {revenue.totalAmount.toNumber()}
            </span>
            <span className="ml-2 text-xs">{asset.symbol}</span>
          </div>
        )
      })}
      {revenueLoading && (
        <div className="mt-3 flex flex-row items-center justify-center font-mono md:justify-start">
          <Skeleton className="h-3 w-10" />
        </div>
      )}
      {!data?.length && (
        <span className="mt-1 text-xs text-gray-600">None yet</span>
      )}
    </div>
  )
}
