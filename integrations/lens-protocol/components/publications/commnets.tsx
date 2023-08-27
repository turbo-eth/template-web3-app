import { PublicationId, useComments } from '@lens-protocol/react-web'

import { PublicationCard } from './publication-card'
import { Spinner } from '../spinner'

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
    <div className="mt-4 flex w-full flex-col">
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
        <button className="btn btn-primary m-auto mt-4 mb-6 w-auto" disabled={loading} onClick={() => next()}>
          Load more
        </button>
      )}
      {loading && (
        <div className="my-6 w-full text-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}
