import { Comment, Mirror, Post, PublicationId, usePublication } from '@lens-protocol/react-web'
import { FaRegCommentAlt, FaRetweet } from 'react-icons/fa'

import { LinkComponent } from '@/components/shared/link-component'

import { Spinner } from '../spinner'
import { PublicationCard, PublicationCardMode } from './publication-card'

export const Publication = ({ publicationId }: { publicationId: PublicationId }) => {
  return (
    <div className="w-full mt-6">
      <PublicationDetails publicationId={publicationId} />
    </div>
  )
}

export const PublicationDetails = ({ publicationId }: { publicationId: PublicationId }) => {
  const { data: publication, loading } = usePublication({
    publicationId,
  })
  if (loading) return <Spinner />
  if (!publication) return <div className="w-full text-center pt-6">Publication not found!</div>
  if (publication.__typename === 'Mirror') return <RenderMirror publication={publication} />
  if (publication.__typename === 'Comment') return <RenderComment publication={publication} />
  if (publication.__typename === 'Post') return <RenderPost publication={publication} />
  return <div className="w-full text-center pt-6">Unknown type of publication!</div>
}

const RenderPost = ({ publication }: { publication: Post }) => {
  return <PublicationCard mode={PublicationCardMode.Full} publication={publication} />
}

const RenderMirror = ({ publication }: { publication: Mirror }) => {
  const { profile } = publication
  return (
    <div className="flex flex-col w-full">
      <div className="text-gray-600 dark:text-slate-100 mb-4 relative top-[-10px] flex flex-row items-center">
        <FaRetweet />
        <LinkComponent href={`/integration/lens-protocol/profiles/${profile.handle}`}>
          <span className="font-bold mx-1">{profile.name ?? profile.handle}</span>
        </LinkComponent>
        <span>Mirrored</span>
      </div>
      {publication.mirrorOf.__typename === 'Post' && <RenderPost publication={publication.mirrorOf} />}
      {publication.mirrorOf.__typename === 'Comment' && <RenderComment publication={publication.mirrorOf} />}
    </div>
  )
}

const RenderComment = ({ publication }: { publication: Comment }) => {
  const { profile } = publication
  return (
    <div className="flex flex-col w-full">
      <div className="text-gray-600 dark:text-slate-100 mb-1 flex flex-row items-center">
        <span>Original publication</span>
      </div>
      {publication.commentOn?.__typename === 'Post' && <PublicationCard mode={PublicationCardMode.Compact} publication={publication.commentOn} />}
      <div className="text-gray-600 dark:text-slate-100 mb-1 flex flex-row items-center">
        <FaRegCommentAlt />
        <LinkComponent href={`/integration/lens-protocol/profiles/${profile.handle}`}>
          <span className="font-bold mx-1">{profile.name ?? profile.handle}</span>
        </LinkComponent>
        <span>Commented</span>
      </div>
      <PublicationCard mode={PublicationCardMode.Full} publication={publication} />
    </div>
  )
}
