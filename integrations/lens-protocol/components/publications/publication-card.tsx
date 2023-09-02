import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Comment, FeedItem, Post } from "@lens-protocol/react-web"
import moment from "moment"
import { FaRetweet } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

import { getProfilePictureSrc } from "../../utils"
import { Comments } from "./commnets"
import { PublicationActionsAndStats } from "./publication-actions-and-stats"
import { PublicationRevenue } from "./publication-revenue"

export enum PublicationCardMode {
  Normal = "normal",
  Compact = "compact",
  FeedComment = "FeedComment",
  Full = "full",
}

const Wrapper = ({
  shouldLinkToFullMode,
  children,
  id,
  classNames,
  chainedStyle,
  last,
}: {
  shouldLinkToFullMode: boolean
  children: ReactNode
  id: string
  classNames: string
  chainedStyle: boolean
  last: boolean
}) => {
  const router = useRouter()
  const defaultClassName = "p-6 w-full block"
  const bottomLine =
    "before:absolute before:left-[32px] before:top-[40px] before:h-full before:bg-slate-200 before:dark:bg-neutral-600 before:self-start before:w-[1px]"
  const topLine =
    "after:absolute after:left-[32px] after:top-[0px] after:h-[24px] after:bg-slate-200 after:dark:bg-neutral-600 after:self-start after:w-[1px]"
  const chainedClassName = "relative ml-[-12px]"
  const baseClassName = cn(
    defaultClassName,
    chainedStyle && chainedClassName,
    chainedStyle && !last && bottomLine,
    chainedStyle && topLine
  )
  if (shouldLinkToFullMode)
    return (
      <Card
        className={cn(
          baseClassName,
          "mb-4 cursor-pointer hover:bg-gray-100 hover:dark:bg-neutral-900",
          classNames
        )}
        onClick={(e) => {
          e.stopPropagation()
          router.push(`/integration/lens-protocol/publications/${id}`)
        }}
      >
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    )
  return (
    <Card className={cn(baseClassName, classNames)}>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  )
}

export const PublicationCard = ({
  publication,
  feedItem,
  mode = PublicationCardMode.Normal,
  wrapperClassNames = "",
  last = false,
  chainedStyle = false,
}: {
  publication: Post | Comment
  feedItem?: FeedItem
  mode?: PublicationCardMode
  wrapperClassNames?: string
  last?: boolean
  chainedStyle?: boolean
}) => {
  const router = useRouter()
  const compactMode = mode === PublicationCardMode.Compact
  const fullMode = mode === PublicationCardMode.Full
  const feedCommentMode = mode === PublicationCardMode.FeedComment
  const { profile } = publication
  const mirrored = feedItem?.electedMirror ?? false
  const bottomLine =
    "relative before:absolute before:left-[-20px] before:top-[-16px] before:h-[calc(100%_+_32px)] before:bg-slate-200 before:dark:bg-neutral-600 before:self-start before:w-[1px]"
  return (
    <Wrapper
      chainedStyle={chainedStyle}
      classNames={wrapperClassNames}
      id={publication.id}
      last={last}
      shouldLinkToFullMode={!fullMode}
    >
      {mirrored && (
        <div className="relative top-[-10px] mb-4 flex flex-row items-center text-gray-600 dark:text-slate-100">
          <FaRetweet />
          <span className="mx-1 font-bold">
            {feedItem?.electedMirror?.profile.name ??
              feedItem?.electedMirror?.profile.handle}
          </span>
          <span>Mirrored</span>
        </div>
      )}
      <div
        className={cn(
          compactMode && "flex flex-col items-center space-x-4 md:flex-row"
        )}
      >
        <div className="flex w-auto cursor-pointer flex-row items-center">
          <div
            className="flex w-auto flex-row"
            onClick={(e) => {
              e.stopPropagation()
              router.push(
                `/integration/lens-protocol/profiles/${profile.handle}`
              )
            }}
          >
            <Avatar className={cn(compactMode && "h-6 w-6")}>
              <AvatarImage src={getProfilePictureSrc(profile)} />
              <AvatarFallback className="uppercase">
                {profile.handle.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2 flex w-auto flex-col">
              <span className="mb-1 font-semibold">
                {profile.name ?? profile.handle}
              </span>
              {!compactMode && (
                <span className="text-sm text-blue-600 dark:text-gray-300">
                  @{profile.handle}
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "ml-10 mt-4",
            compactMode && "mt-4 flex w-full flex-row items-center md:mt-0",
            fullMode && "text-xl",
            ((fullMode && !!publication.stats.commentsCount) ||
              feedCommentMode) &&
              bottomLine
          )}
        >
          <div
            className={cn(
              "ml-2",
              compactMode && "flex w-full flex-row items-center justify-between"
            )}
          >
            <div
              className={cn("w-full break-words pr-2", compactMode && "flex-1")}
            >
              {publication.metadata?.content}
            </div>
            <div
              className={cn(
                "mt-4 w-full text-xs text-slate-500 dark:text-gray-300",
                compactMode && "flex-0 mt-0 w-auto"
              )}
            >
              {moment(publication.createdAt).format("HH:mm YY MMM DD")}
            </div>
            {!compactMode && (
              <PublicationActionsAndStats
                publication={publication}
                showCounts={fullMode}
              />
            )}
            {fullMode && <PublicationRevenue publicationId={publication.id} />}
          </div>
        </div>
        {fullMode && <Comments publicationId={publication.id} />}
        {feedCommentMode && feedItem?.comments?.[0] && (
          <PublicationCard
            chainedStyle
            last={true}
            publication={feedItem?.comments[0]}
            wrapperClassNames="!px-3 !border-0 !shadow-none mt-3"
          />
        )}
      </div>
    </Wrapper>
  )
}
