import { Post, PublicationTypes, useExplorePublications } from '@lens-protocol/react-web'

import { PublicationCard } from './publication-card'
import { Spinner } from '../spinner'

export const ExplorePublications = () => {
  const { data: publications, loading, hasMore, next } = useExplorePublications({ limit: 10, publicationTypes: [PublicationTypes.Post] })
  return (
    <>
      <div className="flex w-full flex-col">
        <h2 className="my-4 text-lg font-semibold">Publications</h2>
        {publications?.map((publication) => (
          <PublicationCard key={publication.id} publication={publication as Post} />
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
    </>
  )
}
