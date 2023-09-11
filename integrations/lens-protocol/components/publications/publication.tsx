import {
  Comment,
  Mirror,
  Post,
  PublicationId,
  usePublication,
} from "@lens-protocol/react-web"
import { FaRegCommentAlt, FaRetweet } from "react-icons/fa"

import { LinkComponent } from "@/components/shared/link-component"

import { PublicationCard, PublicationCardMode } from "./publication-card"

export const Publication = ({
  publicationId,
}: {
  publicationId: PublicationId
}) => {
  return (
    <div className="mt-6 w-full">
      <PublicationDetails publicationId={publicationId} />
    </div>
  )
}

export const PublicationDetails = ({
  publicationId,
}: {
  publicationId: PublicationId
}) => {
  const { data: publication, loading } = usePublication({
    publicationId,
  })
  if (loading)
    return (
      <PublicationCard mode={PublicationCardMode.Full} publication={null} />
    )
  if (!publication)
    return <div className="w-full pt-6 text-center">Publication not found!</div>
  if (publication.__typename === "Mirror")
    return <RenderMirror publication={publication} />
  if (publication.__typename === "Comment")
    return <RenderComment publication={publication} />
  if (publication.__typename === "Post")
    return <RenderPost publication={publication} />
  return (
    <div className="w-full pt-6 text-center">Unknown type of publication!</div>
  )
}

const RenderPost = ({ publication }: { publication: Post }) => {
  return (
    <PublicationCard
      mode={PublicationCardMode.Full}
      publication={publication}
    />
  )
}

const RenderMirror = ({ publication }: { publication: Mirror }) => {
  const { profile } = publication
  return (
    <div className="flex w-full flex-col">
      <div className="relative top-[-10px] mb-4 flex flex-row items-center text-gray-600 dark:text-slate-100">
        <FaRetweet />
        <LinkComponent
          href={`/integration/lens-protocol/profiles/${profile.handle}`}
        >
          <span className="mx-1 font-bold">
            {profile.name ?? profile.handle}
          </span>
        </LinkComponent>
        <span>Mirrored</span>
      </div>
      {publication.mirrorOf.__typename === "Post" && (
        <RenderPost publication={publication.mirrorOf} />
      )}
      {publication.mirrorOf.__typename === "Comment" && (
        <RenderComment publication={publication.mirrorOf} />
      )}
    </div>
  )
}

const RenderComment = ({ publication }: { publication: Comment }) => {
  const { profile } = publication
  return (
    <div className="flex w-full flex-col">
      <div className="mb-1 flex flex-row items-center text-gray-600 dark:text-slate-100">
        <span>Original publication</span>
      </div>
      {publication.commentOn?.__typename === "Post" && (
        <PublicationCard
          mode={PublicationCardMode.Compact}
          publication={publication.commentOn}
        />
      )}
      <div className="mb-1 flex flex-row items-center text-gray-600 dark:text-slate-100">
        <FaRegCommentAlt />
        <LinkComponent
          href={`/integration/lens-protocol/profiles/${profile.handle}`}
        >
          <span className="mx-1 font-bold">
            {profile.name ?? profile.handle}
          </span>
        </LinkComponent>
        <span>Commented</span>
      </div>
      <PublicationCard
        mode={PublicationCardMode.Full}
        publication={publication}
      />
    </div>
  )
}
