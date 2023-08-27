import { Post, ProfileId, PublicationTypes, useActiveProfile, usePublications } from "@lens-protocol/react-web"
import { PublicationCard } from "../publications/publication-card"
import { Spinner } from "../spinner"

export const ProfilePublications =({profileId, publicationTypes, title}: {profileId: ProfileId, publicationTypes: PublicationTypes[]; title: string})=> {
  const { data: activeProfile } = useActiveProfile()
  const {
    data: publications,
    loading,
    hasMore,
    next,
  } = usePublications({
    profileId,
    observerId: activeProfile?.id,
    publicationTypes,
    limit: 10,
  })
  return (
    <div className="w-full flex flex-col">
    <h2 className="font-semibold text-xs mb-2">{title}</h2>
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
      {publications?.length === 0 && <span>No {title} yet.</span>}
      </div>
  )
}