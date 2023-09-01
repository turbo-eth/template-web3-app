import { useState } from 'react'

import { useToast } from '@/lib/hooks/use-toast'

import { CheckConnection } from '../gitcoin-passport-client'
import { getStamps } from '../hooks/use-get-stamp'
import { ScoreStampProps } from '../utils/types'

export function ScoreStamp({ setStamps }: ScoreStampProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast, dismiss } = useToast()
  const address = CheckConnection()

  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const handleGetScore = async () => {
    setIsLoading(true)
    try {
      if (address) {
        const stamps = await getStamps(address)
        if (stamps) {
          setStamps(stamps)
        }
      }
    } catch (e) {
      handleToast({
        title: 'An Error Occurred',
        description: 'An error occurred while getiing stamps',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="my-4 ml-4">
      <button className="btn btn-emerald" disabled={isLoading} onClick={handleGetScore}>
        {isLoading ? 'Getting Stamps...' : 'Get Stamps'}
      </button>
    </div>
  )
}
