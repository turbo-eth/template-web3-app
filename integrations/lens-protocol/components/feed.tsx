import { ProfileId, useActiveProfile, useFeed } from "@lens-protocol/react-web"

import { LoadMoreButton } from "./load-more-button"
import {
  PublicationCard,
  PublicationCardMode,
} from "./publications/publication-card"

export const Feed = ({ profileId }: { profileId: ProfileId }) => {
  const activeProfile = useActiveProfile()
  const { data, loading, hasMore, next } = useFeed({
    observerId: activeProfile?.data?.id ?? undefined,
    profileId,
    limit: 10,
  })
  return (
    <div>
      <h2 className="mb-2 text-xs font-semibold">Feed</h2>
      {data?.map((feedItem) => (
        <PublicationCard
          key={feedItem.root.id}
          feedItem={feedItem}
          mode={
            feedItem.comments?.[0]
              ? PublicationCardMode.FeedComment
              : PublicationCardMode.Normal
          }
          publication={feedItem.root}
        />
      ))}
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => (
            <PublicationCard publication={null} key={index} />
          ))}
      <LoadMoreButton hasMore={hasMore} loading={loading} onClick={next} />
      {!loading && !data?.length && <span>User feed is empty.</span>}
    </div>
  )
}
