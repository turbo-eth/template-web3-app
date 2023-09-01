'use client'

import { useIpfsNode } from '../hooks/use-ipfs-node'

const IpfsNode: React.FC = () => {
  const { helia, isOnline, id } = useIpfsNode()
  if (!helia || !id) {
    return <h4>Connecting to IPFS...</h4>
  }

  return (
    <div>
      <h4 data-test="id">ID: {id.toString()}</h4>
      <h4 data-test="status">Status: {isOnline ? 'Online' : 'Offline'}</h4>
    </div>
  )
}

export default IpfsNode
