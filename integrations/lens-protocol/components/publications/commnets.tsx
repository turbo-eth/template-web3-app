import { PublicationId, useComments } from "@lens-protocol/react-web"

import { LoadMoreButton } from "../load-more-button"
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
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => (
            <PublicationCard
              chainedStyle
              last={index === 4}
              publication={null}
              wrapperClassNames="!px-3 !border-0 !shadow-none"
              key={index}
            />
          ))}
      <LoadMoreButton hasMore={hasMore} loading={loading} onClick={next} />
    </div>
  )
}
