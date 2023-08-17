import { useEffect, useState } from 'react'

import { useArweaveWallet } from './use-arweave-wallet'
import { queryPosts } from '../queries/query-posts'
import { ArweavePost } from '../utils/types'

export function useGetPosts() {
  const { address } = useArweaveWallet()
  const [posts, setPosts] = useState<ArweavePost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (address) {
      setLoading(true)
      queryPosts(address)
        .then((result) => setPosts(result))
        .catch((e) => console.error(e))
        .finally(() => setLoading(false))
    }
  }, [address])
  return { posts, loading }
}
