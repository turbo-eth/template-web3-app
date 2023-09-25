import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Address } from "@/components/blockchain/address"

import { Token, Vote as VoteType } from "../autogen/schema"
import { humanNumber } from "../utils"

export const Vote = ({ vote, token }: { vote: VoteType; token: Token }) => (
  <Card className="w-full overflow-hidden shadow-none">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={vote.voter.picture ?? ""} alt={vote.voter.name} />
          <AvatarFallback className="flex w-full items-center justify-center bg-muted">
            {vote.voter.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="block w-full">
          <CardTitle className="block w-full truncate whitespace-nowrap">
            {vote.voter.name.startsWith("0x") ? (
              <Address
                truncate
                address={vote.voter.name as `0x${string}`}
                className="text-sm font-medium"
              />
            ) : (
              vote.voter.name
            )}
          </CardTitle>
          <CardDescription className="block w-full truncate whitespace-nowrap">
            <Address
              truncate
              address={vote.voter.address as `0x${string}`}
              className="text-sm font-medium"
            />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {vote.support}{" "}
        <span
          className={cn(
            vote.support === "FOR"
              ? "text-emerald-600 dark:text-emerald-400"
              : vote.support === "AGAINST"
              ? "text-red-600 dark:text-red-400"
              : "text-muted-foreground"
          )}
        >
          {humanNumber(
            vote.weight.substring(0, vote.weight.length - token.decimals)
          )}{" "}
          {token.symbol}
        </span>
      </CardContent>
    </div>
    {vote.reason && (
      <CardDescription className="p-8 pt-0">{vote.reason}</CardDescription>
    )}
  </Card>
)
