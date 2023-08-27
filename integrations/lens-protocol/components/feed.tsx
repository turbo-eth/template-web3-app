import { ProfileId, useActiveProfile, useFeed } from '@lens-protocol/react-web'

import { PublicationCard, PublicationCardMode } from './publications/publication-card'
import { Spinner } from './spinner'

export const Feed = ({ profileId }: { profileId: ProfileId }) => {
  const activeProfile = useActiveProfile()
  const { data, loading, hasMore, next } = useFeed({
    observerId: activeProfile?.data?.id ?? undefined,
    profileId,
    limit: 10,
  })
  if (loading) return <Spinner />
  return (
    <div>
      <h2 className="font-semibold text-xs mb-2">Feed</h2>
      {data?.map((feedItem) => (
        <PublicationCard
          key={feedItem.root.id}
          feedItem={feedItem}
          mode={feedItem.comments?.[0] ? PublicationCardMode.FeedComment : PublicationCardMode.Normal}
          publication={feedItem.root}
        />
      ))}
      {hasMore && (
        <button className="btn btn-primary mt-4 w-auto mb-6 m-auto" disabled={loading} onClick={() => next()}>
          Load more
        </button>
      )}
      {loading && (
        <div className="text-center w-full my-6">
          <Spinner />
        </div>
      )}
      {!data?.length && <span>User feed is empty.</span>}
    </div>
  )
}
