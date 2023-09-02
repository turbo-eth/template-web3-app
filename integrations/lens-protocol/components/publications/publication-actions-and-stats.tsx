import { Comment, Post } from "@lens-protocol/react-web"

import { CommentButton } from "./actions/comment"
import { LikeButton } from "./actions/like"
import { MirrorButton } from "./actions/mirror"
import { PublicationStats } from "./stats"

export const PublicationActionsAndStats = ({
  publication,
  showCounts = false,
}: {
  publication: Post | Comment
  showCounts: boolean
}) => {
  return (
    <div className="mt-8 flex w-full flex-col">
      {showCounts && <PublicationStats publication={publication} />}
      <div className="flex w-full flex-row space-x-4">
        <LikeButton hideCount={showCounts} publication={publication} />
        <MirrorButton hideCount={showCounts} publication={publication} />
        <CommentButton hideCount={showCounts} publication={publication} />
      </div>
    </div>
  )
}
