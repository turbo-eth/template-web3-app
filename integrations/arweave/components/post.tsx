import { useEffect, useState } from 'react'

import { Spinner } from './spinner'
import { getArweaveTx } from '..'
import { ArweaveTx, ArweaveTxId } from '../utils/types'

export const Post = ({ txId }: { txId: ArweaveTxId }) => {
  const [txDetails, setTxDetails] = useState<ArweaveTx | null>(null)
  useEffect(() => {
    getArweaveTx(txId)
      .then((res) => setTxDetails(res))
      .catch(console.error)
  }, [txId])
  return (
    <div className="card">
      {txId}
      {!txDetails ? <Spinner /> : <div>{JSON.stringify(txDetails)}</div>}
    </div>
  )
}
