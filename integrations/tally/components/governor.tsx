import { useQuery } from "@tanstack/react-query"
import { BsChevronLeft } from "react-icons/bs"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { LinkComponent } from "@/components/shared/link-component"

import { Governance, Governor as GovernorType } from "../autogen/schema"
import { useTally } from "../hooks/use-tally"
import { governorQuery } from "../query/query-governor"
import { humanNumber } from "../utils"
import { Delegation } from "./delegation"
import { Proposal } from "./proposal"

export const Governor = ({ slug }: { slug: string }) => {
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
  return <GovernorDetails governor={governor} />
}

export const GovernorDetails = ({ governor }: { governor: Governance }) => {
  const { apiKey } = useTally()
  const fetchGovernorInfo = async () => {
    const response = await governorQuery(
      {
        id: governor.id,
      },
      apiKey!
    )
    if (response.error) throw response.error
    const { governors } = response.result
    return governors[0] as GovernorType
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["governor", governor.id],
    queryFn: fetchGovernorInfo,
    retry: false,
  })
  return (
    <div className="w-full">
      <LinkComponent
        href="/integration/tally"
        className="mb-8 flex flex-row items-center space-x-2 text-muted-foreground"
      >
        <BsChevronLeft />
        Explore DAOs
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
            <CardTitle>{governor.organization.name}</CardTitle>
            <CardDescription>
              {governor.organization.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>Tokens</CardDescription>
          <div className="space-y-2">
            {data?.tokens.map((token) => (
              <div
                key={token.id}
                className="flex flex-col md:flex-row md:items-center md:space-x-2"
              >
                <div className="flex flex-row items-center space-x-2">
                  <span className="font-semibold">{token.name}</span>
                  <Badge variant="secondary" className="mr-2 text-sm">
                    {token.type}
                  </Badge>
                </div>
                <div className="text-sm">
                  <span className="mr-2 text-muted-foreground">Supply:</span>
                  {Number(
                    token.supply.substring(
                      0,
                      token.supply.length - token.decimals
                    )
                  ).toLocaleString()}{" "}
                  {token.symbol}
                </div>
              </div>
            ))}
            {isLoading && <Skeleton className="h-4 w-20" />}
          </div>
          <CardDescription className="mt-8">Stats</CardDescription>
          <div className="grid grid-cols-3 border-y py-4 text-center">
            <div className="flex flex-col space-y-2">
              <span className="font-semibold">
                {governor.stats.proposals.total}
              </span>
              <span className="font-light">Proposals</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-semibold">
                {humanNumber(governor.stats.tokens.owners)}
              </span>
              <span className="font-light">Holders</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-semibold">
                {humanNumber(governor.stats.tokens.voters)}
              </span>
              <span className="font-light">Voters</span>
            </div>
          </div>
          <CardDescription className="mt-8 flex w-full flex-row justify-between">
            <span>Proposals</span>
            <div className="flex flex-row space-x-3">
              <div className="space-x-1">
                <span>{governor.stats.proposals.passed}</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  Passed
                </span>
              </div>
              <div className="space-x-1">
                <span>{governor.stats.proposals.failed}</span>
                <span className="text-red-600 dark:text-red-400">Failed</span>
              </div>
            </div>
          </CardDescription>
          <div className="space-y-2">
            {data?.proposals.map((proposal) => (
              <Proposal
                key={proposal.id}
                proposal={proposal}
                daoSlug={governor.slug}
              />
            ))}
            {isLoading &&
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-12 w-full rounded-md border p-4"
                  />
                ))}
            <div className="mt-2 flex flex-row items-center justify-center">
              <LinkComponent
                href={`/integration/tally/${governor.slug}/proposals`}
              >
                <Button variant="outline">See all Proposals</Button>
              </LinkComponent>
            </div>
          </div>
          <CardDescription className="mt-8">Delegations</CardDescription>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {data?.delegates.map((delegation) => (
              <Delegation
                key={delegation.account.id}
                delegation={delegation}
                governor={data}
              />
            ))}
            {isLoading &&
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[200px] w-full rounded-md border p-4"
                  />
                ))}
          </div>
          <div className="mt-4 flex flex-row items-center justify-center">
            <LinkComponent
              href={`/integration/tally/${governor.slug}/delegates`}
            >
              <Button variant="outline">See all Delegations</Button>
            </LinkComponent>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
