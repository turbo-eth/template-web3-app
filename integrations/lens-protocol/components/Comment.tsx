import { Comment, Profile } from '@lens-protocol/react-web'

type CommentProps = {
  comment: Comment
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 w-full">
      <h2 className="font-bold text-gray-700 text-lg mb-2">{comment.metadata.name}</h2>
      <p className="text-gray-700">{comment.metadata.content}</p>
    </div>
  )
}
