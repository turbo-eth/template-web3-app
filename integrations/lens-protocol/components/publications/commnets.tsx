import { PublicationId, useComments } from '@lens-protocol/react-web'

import { Spinner } from '../spinner'
import { PublicationCard } from './publication-card'

export const Comments = ({ publicationId }: { publicationId: PublicationId }) => {
  const {
    data: comments,
    loading,
    hasMore,
    next,
  } = useComments({
    commentsOf: publicationId,
    limit: 10,
  })
  if (loading) return <Spinner />
  return (
    <div className="w-full flex flex-col mt-4">
      {comments?.map((comment, index) => (
        <PublicationCard
          key={comment.id}
          chainedStyle
          last={index === comments.length - 1}
          publication={comment}
          wrapperClassNames="!px-3 !border-0 !shadow-none"
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
    </div>
  )
}
