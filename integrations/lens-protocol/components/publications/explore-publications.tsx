import {
  Post,
  PublicationTypes,
  useExplorePublications,
} from "@lens-protocol/react-web"

import { LoadMoreButton } from "../load-more-button"
import { Spinner } from "../spinner"
import { PublicationCard } from "./publication-card"

export const ExplorePublications = () => {
  const {
    data: publications,
    loading,
    hasMore,
    next,
  } = useExplorePublications({
    limit: 10,
    publicationTypes: [PublicationTypes.Post],
  })
  return (
    <>
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
      </div>
    </>
  )
}
