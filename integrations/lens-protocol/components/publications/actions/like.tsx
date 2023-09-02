import {
  Profile,
  ReactionTypes,
  useActiveProfile,
  useReaction,
} from "@lens-protocol/react-web"
import { FaHeart, FaRegHeart } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"

import { IActionButton } from "."
import { IsUserAuthenticated } from "../../auth/is-user-authenticated"
import { NotAuthenticatedYet } from "../../auth/not-authenticated-yet"
import { ActionButton } from "./button"

const UnAuthorizedLikeButton = ({ publication, hideCount }: IActionButton) => {
  const { toast, dismiss } = useToast()
  const showErrorToast = () => {
    toast({
      title: "You need to login first.",
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }
  return (
    <ActionButton
      color="red"
      count={publication.stats?.totalUpvotes ?? 0}
      disabled={false}
      execute={() => showErrorToast()}
      hideCount={hideCount}
      icon={<FaRegHeart />}
      name="like"
    />
  )
}

const AuthorizedLikeButton = ({
  publication,
  hideCount,
  profile,
}: IActionButton & { profile: Profile }) => {
  const { addReaction, removeReaction, hasReaction, isPending } = useReaction({
    profileId: profile.id,
  })

  const reactionType = ReactionTypes.Upvote

  const hasReactionType = hasReaction({
    reactionType,
    publication,
  })

  const execute = async () => {
    if (isPending) return
    if (!hasReactionType) {
      await addReaction({
        reactionType,
        publication,
      })
    } else if (hasReactionType) {
      await removeReaction({
        reactionType,
        publication,
      })
    }
  }

  return (
    <ActionButton
      color="red"
      count={publication.stats?.totalUpvotes ?? 0}
      disabled={isPending}
      execute={execute}
      hideCount={hideCount}
      icon={hasReactionType ? <FaHeart /> : <FaRegHeart />}
      name="like"
    />
  )
}

export const LikeButton = (props: IActionButton) => {
  const { data: profile } = useActiveProfile()
  return (
    <>
      <NotAuthenticatedYet>
        <UnAuthorizedLikeButton {...props} />
      </NotAuthenticatedYet>
      <IsUserAuthenticated>
        {profile && <AuthorizedLikeButton profile={profile} {...props} />}
      </IsUserAuthenticated>
    </>
  )
}
