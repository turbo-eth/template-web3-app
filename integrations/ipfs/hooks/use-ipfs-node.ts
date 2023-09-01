import { useEffect, useState } from 'react'

import { createHelia } from 'helia'

export const useIpfsNode = () => {
  const [id, setId] = useState<string | null>(null)
  const [helia, setHelia] = useState<any | null>(null)
  const [isOnline, setIsOnline] = useState<boolean>(false)

  useEffect(() => {
    const init = async () => {
      if (helia) return

      const heliaNode = await createHelia()

      const nodeId = heliaNode.libp2p.peerId.toString()
      const nodeIsOnline = heliaNode.libp2p.isStarted()

      console.log('helia', heliaNode)

      setHelia(heliaNode)
      setId(nodeId)
      setIsOnline(nodeIsOnline)
    }

    void init()
  }, [helia])

  return {
    helia,
    isOnline,
    id,
  }
}
