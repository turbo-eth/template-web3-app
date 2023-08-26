import { Post, PublicationTypes, useExplorePublications } from '@lens-protocol/react-web'

import { Spinner } from '../spinner'
import { PublicationCard } from './publication-card'

export const ExplorePublications = () => {
  const { data: publications, loading, hasMore, next } = useExplorePublications({ limit: 10, publicationTypes: [PublicationTypes.Post] })
  return (
    <>
      <div className="w-full flex flex-col">
        <h2 className="my-4 text-lg font-semibold">Publications</h2>
        {publications?.map((publication) => (
          <PublicationCard key={publication.id} publication={publication as Post} />
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
    </>
  )
}
