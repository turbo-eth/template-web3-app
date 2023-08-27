import { Post, useSearchPublications } from '@lens-protocol/react-web'

import { PublicationCard } from './publication-card'
import { Spinner } from '../spinner'

export const SearchPublications = ({ query }: { query: string }) => {
  const { data: publications, loading, hasMore, next } = useSearchPublications({ query, limit: 10 })
  return (
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
      {!publications?.length && <span>No publications found.</span>}
    </div>
  )
}
