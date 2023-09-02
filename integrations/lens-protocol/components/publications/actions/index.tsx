import { Comment, Post } from "@lens-protocol/react-web"

export interface IActionButton {
  publication: Post | Comment
  hideCount: boolean
}
