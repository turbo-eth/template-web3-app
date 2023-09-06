import Link from "next/link"
import { FaLock } from "react-icons/fa"

import { Skeleton } from "@/components/ui/skeleton"

import { useGetScore } from "../hooks/use-get-score"
import { HAS_NOT_SUBMITTED_PASSPORT_YET_ERROR } from "../utils/constants"
import { ScoreGateProps } from "../utils/types"
import { SubmitPassportButton } from "./submit-passport-button"

export const ScoreGate = ({ score, children, fallback }: ScoreGateProps) => {
  const { data, error, isLoading, refetch } = useGetScore()
  if (isLoading) return <Skeleton className="h-10 w-full" />
  if (error)
    return (
      <div className="space-y-2">
        <div className="text-red-600 dark:text-red-400">{String(error)}</div>
        {String(error) === HAS_NOT_SUBMITTED_PASSPORT_YET_ERROR && (
          <>
            <span className="block text-sm text-gray-600 dark:text-gray-400">
              This usually means you have not submitted your passport for
              scoring yet, please hit the{" "}
              <span className="font-mono">Submit Passport for Scoring</span>{" "}
              button to calculate your score.
            </span>
            <SubmitPassportButton onSuccess={refetch} />
          </>
        )}
      </div>
    )
  if (data?.score && parseFloat(data.score) >= score) return <>{children}</>
  return (
    <>
      {fallback ?? (
        <div className="flex flex-col items-center justify-center space-y-10 rounded-md border-2 p-4 pt-8">
          <FaLock fontSize={50} />
          <span>
            You need a passport with the score of{" "}
            <span className="rounded-xl bg-green-100 px-2 py-1 font-mono font-semibold text-green-600 dark:bg-emerald-900 dark:text-emerald-100">
              {score}
            </span>{" "}
            or above to view this page. You can get more score by claiming more
            stamps <Link href="/integration/gitcoin-passport">here</Link>.
          </span>
        </div>
      )}
    </>
  )
}
