import { Post, useSearchPublications } from "@lens-protocol/react-web"

import { LoadMoreButton } from "../load-more-button"
import { Spinner } from "../spinner"
import { PublicationCard } from "./publication-card"

export const SearchPublications = ({ query }: { query: string }) => {
  const {
    data: publications,
    loading,
    hasMore,
    next,
  } = useSearchPublications({ query, limit: 10 })
  return (
    <div className="flex w-full flex-col">
      <h2 className="my-4 text-lg font-semibold">Publications</h2>
      {publications?.map((publication) => (
        <PublicationCard
          key={publication.id}
          publication={publication as Post}
        />
      ))}
      <LoadMoreButton hasMore={hasMore} loading={loading} onClick={next} />
      {loading && (
        <div className="my-6 w-full text-center">
          <Spinner />
        </div>
      )}
      {!publications?.length && <span>No publications found.</span>}
    </div>
  )
}
