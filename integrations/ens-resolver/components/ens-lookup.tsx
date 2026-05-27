"use client";

import { useState } from "react";
import { useENSResolver } from "../hooks/use-ens-resolver";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ENSLookup() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { resolvedAddress, resolvedName, isLoading, isError } = useENSResolver(search);

  const handleSearch = () => {
    if (query.trim()) setSearch(query.trim());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ENS Resolver</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="vitalik.eth or 0x..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            Lookup
          </Button>
        </div>

        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}

        {!isLoading && search && (
          <div className="space-y-2 text-sm">
            {resolvedAddress && (
              <div>
                <span className="font-medium">Address:</span>{" "}
                <code className="text-xs break-all">{resolvedAddress}</code>
              </div>
            )}
            {resolvedName && (
              <div>
                <span className="font-medium">ENS Name:</span> {resolvedName}
              </div>
            )}
            {isError && (
              <div className="text-destructive">Could not resolve ENS name.</div>
            )}
            {!resolvedAddress && !resolvedName && !isError && (
              <div className="text-muted-foreground">No results found.</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
