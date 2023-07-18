'use client'

import { PublicationId, useComments, usePublication } from '@lens-protocol/react-web'
import { Comment } from './Comment'
interface PublicationSectionProps {
  publicationId: PublicationId
}
export default function CommentSection({ publicationId }: PublicationSectionProps) {
  const { data: comments, loading } = useComments({
    commentsOf: publicationId,
    limit: 10,
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
      {comments && !loading ? (
        <>
          <h1 className="text-4xl font-bold text-center text-blue-600 my-4">Comments</h1>
          {comments?.map((comment: any, index: number) => (
            <Comment comment={comment} />
          ))}
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
