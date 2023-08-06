import { ConnectArweaveWallet } from './connect-arweave-wallet'
import { Spinner } from './spinner'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'
import { useGetPosts } from '../hooks/use-get-posts'

export const ListPosts = () => {
  const { wallet } = useArweaveWallet()
  const { posts, loading } = useGetPosts()

  if (!wallet) return <ConnectArweaveWallet />
  if (loading) return <Spinner />
  return (
    <div className="columns-3">
      {posts.map((p) => (
        <div key={p.id} className="card">
          {p.id}
        </div>
      ))}
    </div>
  )
}
