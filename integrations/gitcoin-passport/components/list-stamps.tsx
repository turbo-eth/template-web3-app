import Image from "next/image"
import moment from "moment"
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai"
import { BiInfoCircle } from "react-icons/bi"
import { FaExternalLinkAlt } from "react-icons/fa"
import { FiCircle, FiRefreshCcw } from "react-icons/fi"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LinkComponent } from "@/components/shared/link-component"

import { useGetAddressStamps } from "../hooks/use-get-address-stamps"
import { useGetAllStamps } from "../hooks/use-get-all-stamps"
import { useGetScore } from "../hooks/use-get-score"
import { HAS_NOT_SUBMITTED_PASSPORT_YET_ERROR } from "../utils/constants"
import { Spinner } from "./spinner"
import { SubmitPassportButton } from "./submit-passport-button"

// just for the demo
const WhiteLogos = ["Github", "Gitcoin", "Lens", "GuildXYZ"]

const SCORE_INFO_TEXT =
  "Make sure to hit the Submit Passport button after you claimed any new stamps to update your score."

export const ListStamps = () => {
  const { stamps, isLoading: stampsLoading } = useGetAllStamps()

  const {
    data: scoreData,
    isLoading: scoreLoading,
    error: scoreError,
    refetch: scoreRefetch,
  } = useGetScore()

  const {
    stamps: addressStamps,
    isLoading: addressStampsLoading,
    refetch: addressStampsRefetch,
  } = useGetAddressStamps()

  if (stampsLoading)
    return (
      <div>
        <Spinner />
      </div>
    )
  return (
    <div>
      <div className="mb-6 flex w-full flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col items-start">
          <>
            <h3 className="mb-6 text-2xl font-bold md:mb-0">Passport</h3>
            <div className="mb-6 mt-2 flex flex-row items-center space-x-2 md:mb-0">
              <div className="text-gray-600 dark:text-gray-400">Score:</div>
              {scoreLoading ? (
                <Spinner isSmall />
              ) : scoreError ? (
                <span className="text-xs text-red-500 dark:text-red-400">
                  {String(scoreError)}
                </span>
              ) : (
                scoreData?.score && (
                  <>
                    <span
                      className={
                        parseFloat(scoreData.score) < 1
                          ? "text-red-600 dark:text-red-400"
                          : parseFloat(scoreData.score) < 20
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }
                    >
                      {parseFloat(scoreData.score).toFixed(2)}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-gray-600 dark:text-gray-400">
                            <BiInfoCircle />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{SCORE_INFO_TEXT}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                )
              )}
            </div>
            {scoreError &&
              String(scoreError) === HAS_NOT_SUBMITTED_PASSPORT_YET_ERROR && (
                <span className="block text-sm text-gray-600 dark:text-gray-400">
                  This usually means you have not submitted your passport yet,
                  please hit the Submit Passport button to calculate your score.
                </span>
              )}
            {scoreData?.last_score_timestamp && (
              <div className="my-2 flex flex-row space-x-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Last submitted at:
                </span>
                <span>
                  {moment(scoreData?.last_score_timestamp).format(
                    "HH:mm DD MMM YYYY"
                  )}
                </span>
              </div>
            )}
          </>
        </div>
        <SubmitPassportButton onSuccess={scoreRefetch} />
      </div>
      <div className="mb-2 mt-4 flex h-[28px] w-full flex-row items-center justify-between">
        <h3 className="font-semibold">All Stamps</h3>
        {!addressStampsLoading && (
          <span
            className="ml-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900"
            onClick={() => addressStampsRefetch()}
          >
            <FiRefreshCcw className="text-neutral-600 dark:text-neutral-100" />
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stamps?.map((stamp) => {
          const addressHasStamp = addressStamps?.find(
            (addressStamp) =>
              addressStamp.provider === stamp.id ||
              addressStamp.items.includes(stamp.id)
          )
          return (
            <Card
              key={stamp.id}
              className="card flex flex-1 flex-col justify-between space-y-4"
            >
              <CardHeader>
                <div className="relative flex h-12 justify-center">
                  <Image
                    width="0"
                    height="0"
                    className={cn(
                      "h-full w-auto",
                      WhiteLogos.includes(stamp.id) && "invert dark:invert-0"
                    )}
                    src={stamp.icon}
                    alt={stamp.id}
                  />
                </div>
                <CardTitle>{stamp.name}</CardTitle>
              </CardHeader>
              <CardDescription className="flex flex-1 items-center justify-center px-4">
                {stamp.description}
              </CardDescription>
              <div className="flex h-[20px] w-full flex-row items-center justify-center">
                {addressStampsLoading ? (
                  <Spinner isSmall />
                ) : addressHasStamp ? (
                  <div className="flex w-full flex-row items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400">
                    <AiOutlineCheck />
                    <span>verified</span>
                  </div>
                ) : (
                  <LinkComponent
                    className={cn(
                      "flex w-full flex-row items-center justify-center space-x-2",
                      buttonVariants({ variant: "link" })
                    )}
                    isExternal
                    href={"https://passport.gitcoin.co/#/dashboard"}
                  >
                    <span>{stamp.connectMessage}</span>
                    <FaExternalLinkAlt />
                  </LinkComponent>
                )}
              </div>
              <CardFooter>
                <Dialog>
                  <DialogTrigger className="flex w-full items-center justify-center">
                    <Button variant="outline" size="sm">
                      More details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex w-full flex-col space-y-4">
                      <div className="relative flex h-10 w-full">
                        <Image
                          width="0"
                          height="0"
                          className={cn(
                            "h-full w-auto",
                            WhiteLogos.includes(stamp.id) &&
                              "invert dark:invert-0"
                          )}
                          src={stamp.icon}
                          alt={stamp.id}
                        />
                      </div>
                      <div className="text-semibold">{stamp.name}</div>
                      <span className="flex flex-1 flex-col justify-center text-sm text-gray-600 dark:text-gray-400">
                        {stamp.description}
                      </span>
                      {stamp.groups.map((group) => (
                        <div key={group.name} className="mb-3">
                          <div className="mb-2 text-xs text-gray-700 dark:text-gray-300">
                            {group.name}
                          </div>
                          {group.stamps.map((groupStamp) => {
                            const addressClaimedStamp = addressStamps?.find(
                              (stamp) => stamp.items.includes(groupStamp.name)
                            )
                            return (
                              <div
                                key={groupStamp.name}
                                className={cn(
                                  "mb-1 flex flex-row items-center space-x-1 text-sm",
                                  addressClaimedStamp
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "dark:text-stale-400 text-gray-600"
                                )}
                              >
                                {addressClaimedStamp ? (
                                  <AiOutlineCheckCircle />
                                ) : (
                                  <FiCircle />
                                )}
                                <div>{groupStamp.description}</div>
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <LinkComponent
                        className="link flex w-full flex-row items-center justify-center space-x-2"
                        isExternal
                        href={"https://passport.gitcoin.co/#/dashboard"}
                      >
                        <span>{stamp.connectMessage}</span>
                        <FaExternalLinkAlt />
                      </LinkComponent>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      <div className="mt-8 text-lg text-gray-600 dark:text-gray-400">
        {SCORE_INFO_TEXT}
      </div>
    </div>
  )
}
