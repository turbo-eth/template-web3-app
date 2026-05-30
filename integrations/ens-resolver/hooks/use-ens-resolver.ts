"use client";

import { useQuery } from "@tanstack/react-query";
import { resolveENSName, lookupENSAddress } from "../api/ens-api";
import { useAccount } from "wagmi";

export function useENSResolver(query: string) {
  const { address: connectedAddress } = useAccount();

  const isAddress = query.startsWith("0x") && query.length === 42;

  const nameQuery = useQuery({
    queryKey: ["ens-name", query],
    queryFn: () => resolveENSName(query),
    enabled: !!query && !isAddress && query.includes("."),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const addressQuery = useQuery({
    queryKey: ["ens-address", query],
    queryFn: () => lookupENSAddress(query),
    enabled: !!query && isAddress,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    resolvedAddress: isAddress ? query : nameQuery.data,
    resolvedName: addressQuery.data,
    isLoading: nameQuery.isLoading || addressQuery.isLoading,
    isError: nameQuery.isError || addressQuery.isError,
    error: nameQuery.error || addressQuery.error,
  };
}
