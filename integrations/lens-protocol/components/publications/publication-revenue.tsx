import { PublicationId, usePublicationRevenue } from "@lens-protocol/react-web"

export const PublicationRevenue = ({
  publicationId,
}: {
  publicationId: PublicationId
}) => {
  const { data, loading: revenueLoading } = usePublicationRevenue({
    publicationId,
  })
  if (revenueLoading) return null
  return (
    <div className="mt-4 w-full border-t-2 pt-4 dark:border-neutral-600/50">
      <h2 className="text-xs font-semibold">Publication Revenue</h2>
      {data ? (
        <div className="mt-3 flex flex-row items-center justify-center font-mono md:justify-start">
          <span className="text-green-700 dark:text-green-400">
            {data.revenue.totalAmount.toNumber()}
          </span>
          <span className="ml-2 text-xs">
            {data.revenue.totalAmount.asset.symbol}
          </span>
        </div>
      ) : (
        <span className="mt-1 text-xs text-gray-600">None yet</span>
      )}
    </div>
  )
}
