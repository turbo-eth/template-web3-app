import Image from "next/image"
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai"
import { BiInfoCircle } from "react-icons/bi"
import { FaExternalLinkAlt } from "react-icons/fa"
import { FiCircle } from "react-icons/fi"

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
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LinkComponent } from "@/components/shared/link-component"

import { AddressStamp, StampsMetadataResponse } from "../utils/types"

// just for the demo
const WhiteLogos = ["Github", "Gitcoin", "Lens", "GuildXYZ"]

export const StampCard = ({
  stamp,
  addressStamps,
  addressStampsLoading,
  className,
}: {
  stamp?: StampsMetadataResponse
  addressStamps?: AddressStamp[]
  addressStampsLoading?: boolean
  className?: string
}) => {
  const addressHasStamp = !stamp
    ? false
    : addressStamps?.find(
        (addressStamp) =>
          addressStamp.provider === stamp.id ||
          addressStamp.items.includes(stamp.id)
      )
  return (
    <Card
      className={cn(
        "flex flex-1 flex-col items-center justify-between space-y-4 text-center",
        className
      )}
    >
      <CardHeader className="pb-0">
        <div className="relative flex h-12 justify-center">
          {stamp ? (
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
          ) : (
            <Skeleton className="h-12 w-12 rounded-full" />
          )}
        </div>
        <CardTitle className="mt-2">
          {stamp ? stamp.name : <Skeleton className="mx-auto h-6 w-32" />}
        </CardTitle>
      </CardHeader>
      <CardDescription className="flex flex-1 items-center justify-center px-4">
        {stamp ? (
          stamp.description
        ) : (
          <div className="flex flex-col items-center space-y-1">
            <Skeleton className="h-2 w-[200px]" />
            <Skeleton className="h-2 w-[120px]" />
            <Skeleton className="h-2 w-[80px]" />
          </div>
        )}
      </CardDescription>
      <div className="flex h-[20px] w-full flex-row items-center justify-center">
        {addressStampsLoading || !stamp ? (
          <Skeleton className="h-6 w-32" />
        ) : addressHasStamp ? (
          <div className="flex w-full flex-row items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400">
            <AiOutlineCheck />
            <span>Verified</span>
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
        {stamp ? (
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
                      WhiteLogos.includes(stamp.id) && "invert dark:invert-0"
                    )}
                    src={stamp.icon}
                    alt={stamp.id}
                  />
                </div>
                <div className="font-semibold">{stamp.name}</div>
                <span className="flex flex-1 flex-col justify-center text-sm text-gray-600 dark:text-gray-400">
                  {stamp.description}
                </span>

                {stamp.groups.map((group) => (
                  <div key={group.name} className="mb-3">
                    <div className="mb-2 text-xs text-gray-700 dark:text-gray-300">
                      {group.name}
                    </div>
                    {group.stamps.map((groupStamp) => {
                      const addressClaimedStamp = addressStamps?.find((stamp) =>
                        stamp.items.includes(groupStamp.name)
                      )
                      return (
                        <div
                          key={groupStamp.name}
                          className={cn(
                            "mb-1 flex flex-row items-center space-x-1 text-sm",
                            addressClaimedStamp
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-gray-600 dark:text-slate-400"
                          )}
                        >
                          {addressClaimedStamp ? (
                            <AiOutlineCheckCircle />
                          ) : (
                            <FiCircle />
                          )}
                          <div>{groupStamp.description}</div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-gray-600 dark:text-gray-400">
                                  <BiInfoCircle />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>{groupStamp.name}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              <span className="flex flex-1 flex-row items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                <span>Hover on the</span>
                <BiInfoCircle />
                <span>to see the stamp ID.</span>
              </span>
              <DialogFooter>
                <LinkComponent
                  className="flex w-full flex-row items-center justify-center space-x-2"
                  isExternal
                  href={"https://passport.gitcoin.co/#/dashboard"}
                >
                  <span>{stamp.connectMessage}</span>
                  <FaExternalLinkAlt />
                </LinkComponent>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Skeleton className="mx-auto">
            <Button variant="outline" size="sm" className="opacity-0">
              More details
            </Button>
          </Skeleton>
        )}
      </CardFooter>
    </Card>
  )
}
