import {
  Comment,
  Post,
  useActiveProfile,
  useWhoCollectedPublication,
  useWhoMirroredPublication,
  useWhoReacted,
} from "@lens-protocol/react-web"

import { Stat } from "./stat"

export const PublicationStats = ({
  publication,
}: {
  publication: Post | Comment
}) => {
  const { data: profile } = useActiveProfile()
  const likes = useWhoReacted({
    publicationId: publication.id,
    observerId: profile?.id,
    limit: 10,
  })
  const mirrors = useWhoMirroredPublication({
    publicationId: publication.id,
    observerId: profile?.id,
    limit: 10,
  })
  const collects = useWhoCollectedPublication({
    publicationId: publication.id,
    observerId: profile?.id,
    limit: 10,
  })
  return (
    <div className="mb-4 flex w-full flex-col space-x-0 border-t-2 pt-4 dark:border-neutral-600/50 md:flex-row md:space-x-4">
      <span className="mt-[6px] text-sm">
        <span className="mr-1 font-semibold">
          {publication.stats.commentsCount}
        </span>
        <span className="text-gray-600 dark:text-gray-500">comments</span>
      </span>
      <Stat
        data={likes.data?.map((reaction) => reaction.profile)}
        hasMore={likes.hasMore}
        loading={likes.loading}
        name="likes"
        next={likes.next}
        value={publication.stats.totalUpvotes}
      />
      <Stat
        data={mirrors.data}
        hasMore={mirrors.hasMore}
        loading={mirrors.loading}
        name="mirrors"
        next={mirrors.next}
        value={publication.stats.totalAmountOfMirrors}
      />
      <Stat
        data={collects.data?.flatMap((wallet) =>
          wallet.defaultProfile ? [wallet.defaultProfile] : []
        )}
        hasMore={collects.hasMore}
        loading={collects.loading}
        name="collects"
        next={collects.next}
        value={publication.stats.totalAmountOfCollects}
      />
    </div>
  )
}
