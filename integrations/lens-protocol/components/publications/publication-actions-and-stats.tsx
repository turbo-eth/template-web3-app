import { Comment, Post } from '@lens-protocol/react-web'

import { CommentButton } from './actions/comment'
import { LikeButton } from './actions/like'
import { MirrorButton } from './actions/mirror'
import { PublicationStats } from './stats'

export const PublicationActionsAndStats = ({ publication, showCounts = false }: { publication: Post | Comment; showCounts: boolean }) => {
  return (
    <div className="flex flex-col w-full mt-8">
      {showCounts && <PublicationStats publication={publication} />}
      <div className="flex flex-row w-full space-x-4">
        <LikeButton hideCount={showCounts} publication={publication} />
        <MirrorButton hideCount={showCounts} publication={publication} />
        <CommentButton hideCount={showCounts} publication={publication} />
      </div>
    </div>
  )
}
