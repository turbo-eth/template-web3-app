import { PublicationId, usePublicationRevenue } from '@lens-protocol/react-web'

export const PublicationRevenue = ({ publicationId }: { publicationId: PublicationId }) => {
  const { data, loading: revenueLoading } = usePublicationRevenue({
    publicationId,
  })
  if (revenueLoading) return null
  return (
    <div className="mt-4 pt-4 border-t-2 w-full dark:border-neutral-600">
      <h2 className="font-semibold text-xs">Publication Revenue</h2>
      {data ? (
        <div className="mt-3 font-mono flex flex-row items-center justify-center md:justify-start">
          <span className="text-green-700 dark:text-green-400">{data.revenue.totalAmount.toNumber()}</span>
          <span className="text-xs ml-2">{data.revenue.totalAmount.asset.symbol}</span>
        </div>
      ) : (
        <span className="text-xs text-gray-600 mt-1">None yet</span>
      )}
    </div>
  )
}
