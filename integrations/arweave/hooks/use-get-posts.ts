import { useState } from 'react'

/**
 * Placeholder hook for starter. Replace with your own hook.
 */
export function useGetPosts() {
  const [posts, setPosts] = useState([])
  return { posts, setPosts }
}
