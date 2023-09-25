import { useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { BsChevronLeft } from "react-icons/bs"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { LinkComponent } from "@/components/shared/link-component"

import { Governance, Governor as GovernorType } from "../autogen/schema"
import { useTally } from "../hooks/use-tally"
import { proposalsQuery } from "../query/query-proposals"
import { Proposal } from "./proposal"

export const DaoProposals = ({ slug }: { slug: string }) => {
  const {
    governors: { data: governors },
  } = useTally()
  const governor = governors.find((gov) => gov.slug === slug)
  if (!governor) {
    return (
      <Skeleton className="w-full">
        <Card className="h-[300px] w-full"></Card>
      </Skeleton>
    )
  }
  return <ProposalsDetails governor={governor} />
}

export const ProposalsDetails = ({ governor }: { governor: Governance }) => {
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { apiKey } = useTally()
  const fetchProposals = async ({ pageParam = 0 }) => {
    const pageSize = 10
    const response = await proposalsQuery(
      {
        id: governor.id,
        pagination: { limit: pageSize, offset: pageParam * pageSize },
      },
      apiKey!
    )
    if (response.error) throw response.error
    setPage((page) => page + 1)
    const { governors } = response.result
    const { proposals } = governors[0] as GovernorType
    if (proposals.length < pageSize) setHasMore(false)
    return proposals
  }
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["proposals", governor.id],
    queryFn: fetchProposals,
    retry: false,
    getNextPageParam: () => page,
  })
  const loadingState = isLoading || isFetchingNextPage || isFetching
  return (
    <div className="w-full">
      <LinkComponent
        href={`/integration/tally/${governor.slug}`}
        className="mb-8 flex flex-row items-center space-x-2 text-muted-foreground"
      >
        <BsChevronLeft />
        {governor.name}
      </LinkComponent>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={governor.organization.visual.icon ?? ""}
              alt={governor.organization.name}
            />
            <AvatarFallback className="flex w-full items-center justify-center bg-muted">
              {governor.organization.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle>{governor.organization.name} Proposals</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {data?.pages.map((page) =>
            page.map((proposal) => (
              <Proposal
                key={proposal.id}
                proposal={proposal}
                daoSlug={governor.slug}
              />
            ))
          )}
          {loadingState &&
            Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-12 w-full rounded-md border p-4"
                />
              ))}
          <div className="flex flex-row items-center justify-center">
            {hasMore && (
              <Button variant="outline" onClick={() => fetchNextPage()}>
                Load more Proposals
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
