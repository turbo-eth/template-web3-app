import {
  Post,
  ProfileId,
  PublicationTypes,
  useActiveProfile,
  usePublications,
} from "@lens-protocol/react-web"
import { FaRetweet } from "react-icons/fa"

import { LoadMoreButton } from "../load-more-button"
import { PublicationCard } from "../publications/publication-card"

export const ProfilePublications = ({
  profileId,
  publicationTypes,
  title,
}: {
  profileId: ProfileId
  publicationTypes: PublicationTypes[]
  title: string
}) => {
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
    <div className="flex w-full flex-col">
      <h2 className="mb-2 text-xs font-semibold">{title}</h2>
      {publications?.map((publication) =>
        publication.__typename === "Mirror" ? (
          <>
            <div className="mb-2 flex flex-row items-center text-gray-600 dark:text-slate-100">
              <FaRetweet />
              <span className="mx-1 font-bold">
                {publication.profile.name ?? publication.profile.handle}
              </span>
              <span>Mirrored</span>
            </div>
            <PublicationCard
              key={publication.id}
              publication={publication.mirrorOf}
            />
          </>
        ) : (
          <PublicationCard
            key={publication.id}
            publication={publication as Post}
          />
        )
      )}
      {loading &&
        Array(5)
          .fill(0)
          .map((_, index) => (
            <PublicationCard publication={null} key={index} />
          ))}
      <LoadMoreButton hasMore={hasMore} loading={loading} onClick={next} />
      {publications?.length === 0 && <span>No {title} yet.</span>}
    </div>
  )
}
