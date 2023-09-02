import { PublicationId, useComments } from "@lens-protocol/react-web"

import { LoadMoreButton } from "../load-more-button"
import { Spinner } from "../spinner"
import { PublicationCard } from "./publication-card"

export const Comments = ({
  publicationId,
}: {
  publicationId: PublicationId
}) => {
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
      <LoadMoreButton hasMore={hasMore} loading={loading} onClick={next} />
      {loading && (
        <div className="my-6 w-full text-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}
