import { ProfileId, useProfileFollowRevenue } from '@lens-protocol/react-web'

import { Spinner } from '../spinner'

export const ProfileRevenue = ({ profileId }: { profileId: ProfileId }) => {
  const { data, loading: revenueLoading } = useProfileFollowRevenue({
    profileId,
  })
  if (revenueLoading) return <Spinner />
  return (
    <div className="mt-4 pt-4 border-t-2 w-full dark:border-neutral-800">
      <h2 className="font-semibold text-xs">Profile Revenue</h2>
      {data?.map((revenue) => {
        const { asset } = revenue.totalAmount
        return (
          <div key={asset.address} className="mt-3 font-mono flex flex-row items-center justify-center md:justify-start">
            <span className="text-green-700 dark:text-green-400">{revenue.totalAmount.toNumber()}</span>
            <span className="text-xs ml-2">{asset.symbol}</span>
          </div>
        )
      })}
      {!data?.length && <span className="text-xs text-gray-600 mt-1">None yet</span>}
    </div>
  )
}
