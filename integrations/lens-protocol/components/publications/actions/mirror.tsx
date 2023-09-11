import { useEffect } from "react"
import {
  ProfileOwnedByMe,
  useActiveProfile,
  useCreateMirror,
} from "@lens-protocol/react-web"
import { FaRetweet } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"

import { IActionButton } from "."
import { IsUserAuthenticated } from "../../auth/is-user-authenticated"
import { NotAuthenticatedYet } from "../../auth/not-authenticated-yet"
import { ActionButton } from "./button"

const UnAuthorizedMirrorButton = ({
  publication,
  hideCount,
}: IActionButton) => {
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
      color="blue"
      count={publication.stats?.totalAmountOfMirrors ?? 0}
      disabled={!publication.canMirror.result}
      execute={() => showErrorToast()}
      hideCount={hideCount}
      icon={<FaRetweet />}
      name="mirror"
    />
  )
}

const AuthorizedMirrorButton = ({
  publication,
  hideCount,
  profile,
}: IActionButton & { profile: ProfileOwnedByMe }) => {
  const {
    execute: create,
    isPending,
    error,
  } = useCreateMirror({ publisher: profile })
  const { toast, dismiss } = useToast()
  const showErrorToast = (error: string) => {
    toast({
      title: "Mirror failed.",
      description: error,
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }
  useEffect(() => {
    if (error) showErrorToast(String(error))
  }, [error])
  return (
    <ActionButton
      color="blue"
      count={publication.stats?.totalAmountOfMirrors ?? 0}
      disabled={
        !publication.canMirror.result || isPending || publication.isMirroredByMe
      }
      hideCount={hideCount}
      icon={<FaRetweet />}
      name="mirror"
      execute={() =>
        create({
          publication,
        })
      }
    />
  )
}

export const MirrorButton = (props: IActionButton) => {
  const { data: profile } = useActiveProfile()
  return (
    <>
      <NotAuthenticatedYet>
        <UnAuthorizedMirrorButton {...props} />
      </NotAuthenticatedYet>
      <IsUserAuthenticated>
        {profile && <AuthorizedMirrorButton profile={profile} {...props} />}
      </IsUserAuthenticated>
    </>
  )
}
