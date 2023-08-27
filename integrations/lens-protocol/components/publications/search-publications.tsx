import { Post, useSearchPublications } from '@lens-protocol/react-web'

import { Spinner } from '../spinner'
import { PublicationCard } from './publication-card'

export const SearchPublications = ({ query }: { query: string }) => {
  const { data: publications, loading, hasMore, next } = useSearchPublications({ query, limit: 10 })
  return (
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
      {!publications?.length && <span>No publications found.</span>}
    </div>
  )
}
