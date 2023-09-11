import moment from "moment"
import { BiInfoCircle } from "react-icons/bi"
import { FiRefreshCcw } from "react-icons/fi"

import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useGetAddressStamps } from "../hooks/use-get-address-stamps"
import { useGetScore } from "../hooks/use-get-score"
import { useGetStampsMetadata } from "../hooks/use-get-stamps-metadata"
import { HAS_NOT_SUBMITTED_PASSPORT_YET_ERROR } from "../utils/constants"
import { StampCard } from "./stamp-card"
import { SubmitPassportButton } from "./submit-passport-button"

const SCORE_INFO_TEXT =
  "Make sure to hit the Submit Passport button after you claimed any new stamps to update your score."

export const ListStamps = () => {
  const { stamps, isLoading: stampsLoading } = useGetStampsMetadata()

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

  return (
    <div>
      <div className="mb-6 flex w-full flex-col">
        <div className="flex flex-col items-start">
          <>
            <h3 className="mb-6 text-2xl font-bold md:mb-2">Passport</h3>
            <div className="mb-6 text-sm">
              By collecting “stamps” of validation for your identity and online
              reputation, you can gain access to the most trustworthy web3
              experiences and maximize your ability to benefit from platforms
              like Gitcoin Grants. The more you verify your identity, the more
              opportunities you will have to vote and participate across the
              web3.
            </div>
            <SubmitPassportButton onSuccess={scoreRefetch} />
            <div className="mb-6 mt-2 flex flex-row items-center space-x-2 md:mb-0">
              <div className="text-gray-600 dark:text-gray-400">Score:</div>
              {scoreLoading ? (
                <Skeleton className="h-6 w-[50px]" />
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
                  This usually means you have not submitted your passport for
                  scoring yet, please hit the{" "}
                  <span className="font-mono">Submit Passport for Scoring</span>{" "}
                  button to calculate your score.
                </span>
              )}
            {scoreData?.last_score_timestamp && (
              <div className="flex flex-col space-x-0 space-y-2 md:my-2 md:flex-row md:space-x-2 md:space-y-0">
                <span className="text-gray-600 dark:text-gray-400">
                  Last submitted at:
                </span>
                <span>
                  {scoreData ? (
                    moment(scoreData.last_score_timestamp).format(
                      "HH:mm DD MMM YYYY"
                    )
                  ) : (
                    <Skeleton className="h-6 w-[50px]" />
                  )}
                </span>
              </div>
            )}
          </>
        </div>
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {stamps
          ? stamps.map((stamp) => (
              <StampCard
                key={stamp.id}
                stamp={stamp}
                addressStamps={addressStamps}
                addressStampsLoading={addressStampsLoading}
              />
            ))
          : Array(6)
              .fill(0)
              .map((_, idx) => <StampCard key={idx} />)}
      </div>
      <div className="mt-8 text-lg text-gray-600 dark:text-gray-400">
        {SCORE_INFO_TEXT}
      </div>
    </div>
  )
}
