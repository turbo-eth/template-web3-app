import { FaRegCommentAlt } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"

import { IActionButton } from "."
import { ActionButton } from "./button"

export const CommentButton = ({ publication, hideCount }: IActionButton) => {
  const { toast, dismiss } = useToast()
  const showErrorToast = () => {
    toast({
      title: "Commenting on a publication is not supported currently.",
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }
  return (
    <ActionButton
      color="green"
      count={publication.stats.commentsCount}
      disabled={!publication.canComment.result}
      execute={() => showErrorToast()}
      hideCount={hideCount}
      icon={<FaRegCommentAlt />}
      name="comment"
    />
  )
}
