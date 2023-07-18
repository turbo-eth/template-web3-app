'use client'

import { PublicationId, usePublication } from '@lens-protocol/react-web'
import { Publication } from './Publication'
import CommentSection from './CommentSection'
interface PublicationSectionProps {
  publicationId: PublicationId
}
export default function PublicationSection({ publicationId }: PublicationSectionProps) {
  const { data: publication, loading } = usePublication({
    publicationId,
  })

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <div className=" text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }

  return (
    <>
      {publication && !loading ? (
        <>
          <Publication publication={publication} />
          <CommentSection publicationId={publicationId} />
        </>
      ) : (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full">
          <div className="text-center">
            <div className="mb-5">
              <img className="m-auto" src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>

            <h1 className="my-2 text-white font-bold text-2xl">Looks like you&apos;ve found the doorway to the great nothing</h1>
            <p className="my-7 text-white">Sorry about that! Please visit our hompage to get where you need to go.</p>
          </div>
        </div>
      )}
    </>
  )
}
