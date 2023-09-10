import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { Governor } from "../autogen/schema"
import { useGovernors } from "../hooks/use-governors"

const GovernorRow = ({ governor }: { governor: Governor | null }) => (
  <Link
    className="block w-full"
    href={governor ? `/integration/tally/${governor.id}` : "/integartion/tally"}
  >
    <Card className="flex w-full cursor-pointer flex-col space-y-2 p-4 md:flex-row md:items-center md:space-y-0">
      <div className="flex flex-row flex-wrap md:space-x-2">
        <CardTitle className="mr-2 text-lg font-semibold">
          {governor ? governor.name : <Skeleton className="h-8 w-20" />}
        </CardTitle>
        {(governor?.proposalStats?.active ?? 0) > 0 && (
          <Badge variant="secondary" className="grow-0">
            Active Proposal
          </Badge>
        )}
        {!governor && (
          <Skeleton>
            <Badge variant="secondary" className="opacity-0">
              Active Proposal
            </Badge>
          </Skeleton>
        )}
      </div>
      <div className="flex flex-1 flex-row flex-wrap items-center text-sm md:justify-end">
        <div className="mr-4 flex flex-row space-x-2">
          <span className="opacity-80">Total Proposals:</span>
          <span className="font-semibold">
            {governor ? (
              governor.proposalStats.total
            ) : (
              <Skeleton className="h-4 w-6" />
            )}
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <span className="opacity-80">Active Proposals:</span>
          <span className="font-semibold">
            {governor ? (
              governor.proposalStats.active
            ) : (
              <Skeleton className="h-4 w-6" />
            )}
          </span>
        </div>
      </div>
    </Card>
  </Link>
)

export const Governors = () => {
  const { governors, next, hasMore, isLoading } = useGovernors()
  return (
    <div className="w-full space-y-4">
      <h3 className="font-semibold">DAOs</h3>
      <GovernorRow governor={null} />
      {governors.map((governor) => (
        <GovernorRow key={governor.id} governor={governor} />
      ))}
      {isLoading &&
        Array(10)
          .fill(0)
          .map((_, index) => <GovernorRow key={index} governor={null} />)}
      {hasMore && (
        <Button
          className="mx-auto"
          variant="outline"
          onClick={() => next()}
          disabled={isLoading}
        >
          Load More
        </Button>
      )}
    </div>
  )
}
