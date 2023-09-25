import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

import { useTally } from "../hooks/use-tally"
import { humanNumber } from "../utils"

const pageSize = 10
export const ExploreGovernors = () => {
  const [page, setPage] = useState<number>(0)
  const [selectedChain, setSelectedChain] = useState<string>("all")
  const [filterName, setFilterName] = useState<string | null>(null)

  useEffect(() => {
    setPage(0)
  }, [selectedChain, filterName])
  const {
    governors: { data, isLoading, error },
    chains,
  } = useTally()

  const filteredRows = useMemo(
    () =>
      data.filter((gov) => {
        if (
          filterName &&
          !gov.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
        )
          return false
        if (selectedChain !== "all" && gov.chainId !== selectedChain)
          return false
        return true
      }),
    [selectedChain, filterName]
  )
  const totalPages = useMemo(
    () => Math.floor(filteredRows.length / pageSize),
    [filteredRows]
  )
  const rows = useMemo(
    () => filteredRows.slice(page * pageSize, (page + 1) * pageSize),
    [filteredRows, page]
  )
  const clearFilters = () => {
    setSelectedChain("all")
    setFilterName(null)
  }
  return (
    <Card className="w-full space-y-4">
      <CardHeader className="flex flex-col pb-0 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="font-semibold">DAOs</h3>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
          <Input
            value={filterName ?? ""}
            placeholder="Find DAO by name"
            disabled={isLoading}
            onChange={(e) => setFilterName(e.target.value)}
          />
          <Select
            disabled={isLoading || !chains.length}
            onValueChange={setSelectedChain}
            value={selectedChain}
          >
            <SelectTrigger className="w-full max-w-full md:w-[350px]">
              <SelectValue placeholder="All chains" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px] w-[350px] max-w-full">
                <SelectItem value="all">All chains</SelectItem>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    <div className="flex flex-row items-center space-x-2">
                      {chain.svg && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`data:image/svg+xml;base64,${Buffer.from(
                              chain.svg
                            ).toString("base64")}`}
                            alt={chain.name}
                          />
                          <AvatarFallback>{chain.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <span className="block w-full truncate whitespace-nowrap">
                        {chain.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="whitespace-nowrap"
            onClick={() => clearFilters()}
            disabled={!filterName && selectedChain === "all"}
          >
            Clear filters
          </Button>
        </div>
      </CardHeader>
      {!!error && (
        <div className="rounded-lg border-destructive bg-destructive/20 p-4 text-red-600 dark:text-red-400">
          {String(error)}
        </div>
      )}
      <CardContent className="pt-0">
        {!isLoading &&
          rows &&
          rows.map((gov) => (
            <Link
              key={gov.id}
              href={`/integration/tally/${gov.slug}`}
              className="mb-4 block w-full"
            >
              <Card className="flex flex-col whitespace-nowrap shadow-none lg:flex-row lg:items-center lg:justify-between">
                <CardHeader className="lg:flex-1">
                  <div className="flex flex-row items-center space-x-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={gov.organization.visual.icon ?? ""}
                        alt={gov.organization.name}
                      />
                      <AvatarFallback className="flex w-full items-center justify-center bg-muted">
                        {gov.organization.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="flex flex-col items-start space-y-2 font-bold md:flex-row md:items-center md:space-x-2 md:space-y-0">
                      <span>{gov.organization.name}</span>
                      {gov.stats.proposals.active > 0 && (
                        <Badge
                          variant="secondary"
                          className="inline h-6 grow-0 text-xs"
                        >
                          Active Proposal
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="w-full pt-0 lg:flex-1 lg:pt-8">
                  <div className="grid grid-cols-3 border-t py-4 text-center lg:border-l lg:border-t-0">
                    <div className="flex flex-col space-y-2">
                      <span className="font-semibold">
                        {gov.stats.proposals.total}
                      </span>
                      <span className="font-light">Proposals</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="font-semibold">
                        {humanNumber(gov.stats.tokens.owners)}
                      </span>
                      <span className="font-light">Holders</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="font-semibold">
                        {humanNumber(gov.stats.tokens.voters)}
                      </span>
                      <span className="font-light">Voters</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        {!isLoading && filteredRows.length === 0 && (
          <span>No DAO found...</span>
        )}
        {isLoading &&
          Array(10)
            .fill(0)
            .map((_, index) => <GovernorRowSkeleton key={index} />)}
        <div className="flex w-full items-center justify-between px-2">
          <div className="flex w-full items-center md:space-x-6 lg:space-x-8">
            <div className="flex w-full flex-col-reverse justify-center space-x-2 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full justify-center text-sm font-medium md:items-center md:justify-start">
                Page {page + 1} of {Math.ceil(filteredRows.length / pageSize)}
              </div>
              <div className="mb-2 flex items-center justify-center space-x-2 md:justify-end">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage(0)}
                  disabled={totalPages === 0 || page === 0}
                >
                  <span className="sr-only">Go to first page</span>
                  <BsChevronDoubleLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage(page - 1)}
                  disabled={totalPages === 0 || page === 0}
                >
                  <span className="sr-only">Go to previous page</span>
                  <BsChevronLeft className="h-4 w-4" />
                </Button>
                <span>{page + 1}</span>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage(page + 1)}
                  disabled={totalPages === 0 || page + 1 === totalPages}
                >
                  <span className="sr-only">Go to next page</span>
                  <BsChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage(totalPages - 1)}
                  disabled={totalPages === 0 || page + 1 === totalPages}
                >
                  <span className="sr-only">Go to last page</span>
                  <BsChevronDoubleRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const GovernorRowSkeleton = () => (
  <div className="flex w-full flex-row justify-between border p-8">
    <div className="flex flex-row flex-wrap items-center space-x-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-6 w-20" />
    </div>
    <div className="flex flex-1 flex-row flex-wrap items-center text-sm md:justify-end">
      <div className="mr-4 flex flex-row space-x-2">
        <span className="font-semibold">
          <Skeleton className="h-4 w-6" />
        </span>
      </div>
      <div className="flex flex-row space-x-2">
        <span className="font-semibold">
          <Skeleton className="h-4 w-6" />
        </span>
      </div>
    </div>
  </div>
)
