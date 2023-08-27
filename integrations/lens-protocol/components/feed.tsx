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
      <h2 className="mb-2 text-xs font-semibold">Feed</h2>
      {data?.map((feedItem) => (
        <PublicationCard
          key={feedItem.root.id}
          feedItem={feedItem}
          mode={feedItem.comments?.[0] ? PublicationCardMode.FeedComment : PublicationCardMode.Normal}
          publication={feedItem.root}
        />
      ))}
      {hasMore && (
        <button className="btn btn-primary m-auto mt-4 mb-6 w-auto" disabled={loading} onClick={() => next()}>
          Load more
        </button>
      )}
      {loading && (
        <div className="my-6 w-full text-center">
          <Spinner />
        </div>
      )}
      {!data?.length && <span>User feed is empty.</span>}
    </div>
  )
}
