'use client'

import { Post } from '@/integrations/arweave/components/post'
import { ArweaveTxId } from '@/integrations/arweave/utils/types'

export default function ERC20({ params }: { params: { txId: ArweaveTxId } }) {
  const { txId } = params

  return <Post txId={txId} />
}
