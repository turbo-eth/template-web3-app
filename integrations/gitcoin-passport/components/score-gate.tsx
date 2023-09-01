import { useState } from 'react'

import { useToast } from '@/lib/hooks/use-toast'

import { CheckConnection } from '../gitcoin-passport-client'
import { getScore } from '../hooks/use-get-score'
import { ScoreGateProps } from '../utils/types'
import { env } from 'process'

export function ScoreGate({ setScore }: ScoreGateProps) {
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
    setScore(null)
    try {
      if (address) {
        const score = await getScore(address)
        if (score && typeof score === 'number') {
          setScore(score)
        }
      }
    } catch (e) {
      handleToast({
        title: 'An Error Occurred',
        description: 'An error occurred while getting score.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="m-4">
      <button className="btn btn-emerald" disabled={isLoading} onClick={handleGetScore}>
        {isLoading ? 'Getting Score...' : 'Get Score'}
      </button>
    </div>
  )
}
