import { HTMLAttributes } from "react"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import { BsChevronLeft } from "react-icons/bs"
import Markdown from "react-markdown"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { LinkComponent } from "@/components/shared/link-component"

import { Governance, Proposal as ProposalType } from "../autogen/schema"
import { useTally } from "../hooks/use-tally"
import { proposalQuery } from "../query/query-proposal"
import { ProposalVoteStats } from "./proposal"
import { Vote } from "./vote"

export const ProposalDetails = ({
  daoSlug,
  proposalId,
}: {
  daoSlug: string
  proposalId: string
}) => {
  const {
    governors: { data: governors },
  } = useTally()
  const governor = governors.find((gov) => gov.slug === daoSlug)
  if (!governor) {
    return (
      <Skeleton className="w-full">
        <Card className="h-[300px] w-full"></Card>
      </Skeleton>
    )
  }
  return <ProposalsStats governor={governor} proposalId={proposalId} />
}

const ProposalsStats = ({
  governor,
  proposalId,
}: {
  governor: Governance
  proposalId: string
}) => {
  const { apiKey } = useTally()
  const fetchProposalDetails = async () => {
    const response = await proposalQuery(
      {
        proposalId,
        governanceId: governor.id,
      },
      apiKey!
    )
    if (response.error) throw response.error
    const { proposal } = response.result
    return proposal as ProposalType
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["proposal", proposalId],
    queryFn: fetchProposalDetails,
    retry: false,
  })
  const lastStatus =
    data?.statusChanges?.[data?.statusChanges?.length - 1] ?? null
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
        <CardHeader>
          <CardTitle>
            {data ? (
              <Markdown>{data?.description.split("\\n")[0]}</Markdown>
            ) : (
              <Skeleton className="mb-1 h-10 w-32" />
            )}
          </CardTitle>
          <CardDescription>
            {data?.block?.timestamp &&
              moment(data.block.timestamp).format("MMM Do, YYYY")}
            {isLoading && <Skeleton className="mb-1 h-4 w-20" />}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {lastStatus && <Badge variant="secondary">{lastStatus.type}</Badge>}
          {isLoading && <Skeleton className="mb-1 h-4 w-20" />}
          {data && (
            <Markdown
              components={{
                p: ({ ...props }: HTMLAttributes<HTMLElement>) => (
                  <p className="mb-6 text-sm" {...props} />
                ),
                a: ({ ...props }: HTMLAttributes<HTMLElement>) => (
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    {...props}
                    className="font-medium text-muted-foreground underline transition-colors"
                  />
                ),

                code: ({ ...props }: HTMLAttributes<HTMLElement>) => (
                  <code
                    {...props}
                    className="rounded-sm bg-muted px-1 py-0.5 font-mono font-medium text-muted-foreground"
                  />
                ),
              }}
            >
              {data.description}
            </Markdown>
          )}
          {isLoading && (
            <>
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-[75%]" />
              <Skeleton className="h-4 w-full" />
            </>
          )}
          <CardDescription className="mt-8">Votes</CardDescription>
          {data && <ProposalVoteStats proposal={data} />}
          <div className="mt-2 space-y-2">
            {data?.votes?.map((vote) => (
              <Vote
                key={vote.id}
                vote={vote}
                token={data?.governor.tokens[0]}
              />
            ))}
            {isLoading &&
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-[100px] w-full">
                    <Card className="h-full w-full" />
                  </Skeleton>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
