import moment from "moment"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LinkComponent } from "@/components/shared/link-component"

import { Proposal as ProposalType } from "../autogen/schema"

export const Proposal = ({
  proposal,
  daoSlug,
}: {
  proposal: ProposalType
  daoSlug: string
}) => {
  const lastStatus =
    proposal.statusChanges?.[proposal.statusChanges?.length - 1] ?? null
  return (
    <LinkComponent
      href={`/integration/tally/${daoSlug}/${proposal.id}`}
      className="flex flex-col space-y-2 rounded-md border p-4"
    >
      <div className="flex flex-col md:flex-row">
        <div className="mr-1 block w-full truncate whitespace-nowrap">
          {proposal.description}
        </div>
        <div className="flex flex-row items-center space-x-2">
          {proposal?.block?.timestamp && (
            <span className="whitespace-nowrap  text-xs text-muted-foreground">
              {moment(proposal.block.timestamp).format("MMM Do, YYYY")}
            </span>
          )}
          {lastStatus && <Badge variant="secondary">{lastStatus.type}</Badge>}
        </div>
      </div>
      <ProposalVoteStats proposal={proposal} />
    </LinkComponent>
  )
}

export const ProposalVoteStats = ({ proposal }: { proposal: ProposalType }) => (
  <div className="flex flex-row items-center">
    {proposal.voteStats?.map((voteStat) => (
      <TooltipProvider key={voteStat.support}>
        <Tooltip>
          <TooltipTrigger
            className="float-left inline text-xs"
            style={{
              width: voteStat.percent.toFixed(0) + "%",
              minWidth: "1%",
              maxWidth: "98%",
            }}
          >
            <div
              className={cn(
                "h-1 w-full rounded-sm",
                voteStat.support === "FOR"
                  ? "bg-emerald-600 dark:bg-emerald-400"
                  : voteStat.support === "AGAINST"
                  ? "bg-red-600 dark:bg-red-400"
                  : "bg-muted-foreground"
              )}
            />
          </TooltipTrigger>
          <TooltipContent>
            <div className="whitespace-nowrap">
              <span className="capitalize">
                {voteStat.support.toLocaleLowerCase()}
              </span>
              : {voteStat.votes}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ))}
  </div>
)
