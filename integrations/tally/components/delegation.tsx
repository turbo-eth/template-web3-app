import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Address } from "@/components/blockchain/address"

import { Governor, Participation } from "../autogen/schema"
import { humanNumber } from "../utils"

export const Delegation = ({
  delegation,
  governor,
}: {
  delegation: Participation
  governor: Governor
}) => {
  const token = governor.tokens[0]
  return (
    <Card className="w-full shadow-none">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={delegation.account.picture ?? ""}
            alt={delegation.account.name}
          />
          <AvatarFallback className="flex w-full items-center justify-center bg-muted">
            {delegation.account.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="block w-full">
          <CardTitle className="block w-full truncate whitespace-nowrap">
            {delegation.account.name.startsWith("0x") ? (
              <Address
                truncate
                address={delegation.account.name as `0x${string}`}
                className="text-sm font-medium"
              />
            ) : (
              delegation.account.name
            )}
          </CardTitle>
          <CardDescription className="block w-full truncate whitespace-nowrap">
            {humanNumber(
              delegation.stats.weight.total.substring(
                0,
                delegation.stats.weight.total.length - token.decimals
              )
            )}{" "}
            {token.symbol}
          </CardDescription>
        </div>
      </CardHeader>
      {delegation.account.bio && (
        <CardContent className="pt-0">{delegation.account.bio}</CardContent>
      )}
    </Card>
  )
}
