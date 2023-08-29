import { useCallback, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { queryPosts } from "../queries/query-posts"
import { ArweavePost, ArweaveTxSearchTag } from "../utils/types"
import { useArweaveWallet } from "./use-arweave-wallet"

export function useGetPosts() {
  const { address: connectedWalletAddress } = useArweaveWallet()
  const [posts, setPosts] = useState<ArweavePost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastCursor, setLastCursor] = useState<string>("")
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const txSearchSchema = z.object({
    address: z.string(),
    tags: z.array(
      z.object({
        name: z.string(),
        values: z.array(z.object({ value: z.string() })),
      })
    ),
  })
  const form = useForm<z.infer<typeof txSearchSchema>>({
    resolver: zodResolver(txSearchSchema),
    defaultValues: {
      address: connectedWalletAddress ?? "",
      tags: [],
    },
  })

  const getNextPage = useCallback(
    (address?: string, tags?: ArweaveTxSearchTag[]) => {
      setLoading(true)
      const values = form.getValues()
      queryPosts(address ?? values.address, tags ?? values.tags, lastCursor)
        .then(({ txs, lastCursor, hasNextPage }) => {
          setPosts((posts) => [...posts, ...txs])
          setLastCursor(lastCursor)
          setHasNextPage(hasNextPage)
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false))
    },
    []
  )

  const onSubmit = (values: z.infer<typeof txSearchSchema>) => {
    try {
      setPosts([])
      setLastCursor("")
      setHasNextPage(true)
      getNextPage(values.address, values.tags)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (connectedWalletAddress) getNextPage(connectedWalletAddress, [])
  }, [connectedWalletAddress])
  return {
    form,
    posts,
    loading,
    onSubmit,
    hasNextPage,
    getNextPage,
    lastCursor,
  }
}
