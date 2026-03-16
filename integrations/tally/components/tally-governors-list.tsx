import { useGovernors } from '@/integrations/tally/tally-client'
import { cn } from '@/lib/utils'

interface TallyGovernorsListProps {
  className?: string
  onSelectGovernor?: (governorId: string) => void
}

export function TallyGovernorsList({ className, onSelectGovernor }: TallyGovernorsListProps) {
  const { data: governors, isLoading, error } = useGovernors()

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
        Error loading DAOs: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  if (!governors || governors.length === 0) {
    return (
      <div className={cn('p-4 text-gray-500', className)}>
        No DAOs found. Make sure you have a Tally API key configured.
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      <h3 className="mb-4 text-lg font-semibold">Select a DAO</h3>
      {governors.map((governor) => (
        <button
          key={governor.id}
          onClick={() => onSelectGovernor?.(governor.id)}
          className="w-full rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
        >
          <div className="font-medium">{governor.name}</div>
          <div className="mt-1 text-sm text-gray-500">
            {governor.token.name} ({governor.token.symbol})
          </div>
          <div className="mt-1 text-xs text-gray-400">
            Chain ID: {governor.chainId}
          </div>
        </button>
      ))}
    </div>
  )
}
