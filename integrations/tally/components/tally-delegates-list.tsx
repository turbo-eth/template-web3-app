'use client'

import { useDelegates } from '@/integrations/tally/tally-client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface TallyDelegatesListProps {
  governorId: string
  className?: string
}

// Format delegated votes to human readable
function formatVotes(votes: string): string {
  const num = parseFloat(votes)
  if (num >= 1e18) {
    return (num / 1e18).toFixed(2) + 'M'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'K'
  }
  return num.toFixed(4)
}

export function TallyDelegatesList({ governorId, className }: TallyDelegatesListProps) {
  const { data: delegates, isLoading, error } = useDelegates(governorId)

  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn('p-4 text-red-500', className)}>
        Error loading delegates: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  if (!delegates || delegates.length === 0) {
    return (
      <div className={cn('p-4 text-gray-500', className)}>
        No delegates found for this DAO.
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="mb-4 text-lg font-semibold">Top Delegates</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-500 dark:border-gray-800">
              <th className="pb-2 font-medium">Rank</th>
              <th className="pb-2 font-medium">Address</th>
              <th className="pb-2 font-medium">Votes</th>
              <th className="pb-2 font-medium">Representing</th>
            </tr>
          </thead>
          <tbody>
            {delegates.map((delegate, index) => (
              <motion.tr
                key={delegate.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-gray-100 dark:border-gray-900"
              >
                <td className="py-3">
                  {index < 3 ? (
                    <span className={cn(
                      'rounded px-2 py-1 text-xs font-bold',
                      index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    )}>
                      #{index + 1}
                    </span>
                  ) : (
                    <span className="text-gray-500">#{index + 1}</span>
                  )}
                </td>
                <td className="py-3 font-mono text-sm">
                  {delegate.address.slice(0, 6)}...{delegate.address.slice(-4)}
                </td>
                <td className="py-3">
                  <span className="font-medium">{formatVotes(delegate.delegatedVotes)}</span>
                </td>
                <td className="py-3 text-sm text-gray-500">
                  {delegate.tokenHoldersRepresented} holder{delegate.tokenHoldersRepresented !== 1 ? 's' : ''}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
