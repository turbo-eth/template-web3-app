'use client'

import { useProposals } from '@/integrations/tally/tally-client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface TallyProposalsListProps {
  governorId: string
  className?: string
}

// Proposal status badge colors
function getStatusColor(state: string): string {
  const stateLower = state.toLowerCase()
  switch (stateLower) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'executed':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'defeated':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
}

// Format votes to human readable
function formatVotes(votes: string): string {
  const num = parseFloat(votes)
  if (num >= 1e18) {
    return (num / 1e18).toFixed(2) + 'M'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'K'
  }
  return num.toFixed(2)
}

export function TallyProposalsList({ governorId, className }: TallyProposalsListProps) {
  const { data: proposals, isLoading, error } = useProposals(governorId)

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
        Error loading proposals: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  if (!proposals || proposals.length === 0) {
    return (
      <div className={cn('p-4 text-gray-500', className)}>
        No proposals found for this DAO.
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="mb-4 text-lg font-semibold">Proposals</h3>
      {proposals.map((proposal, index) => (
        <motion.div
          key={proposal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
        >
          <div className="mb-2 flex items-start justify-between">
            <h4 className="font-medium">{proposal.title}</h4>
            <span className={cn('rounded-full px-2 py-1 text-xs font-medium', getStatusColor(proposal.state))}>
              {proposal.state}
            </span>
          </div>
          <p className="mb-3 line-clamp-2 text-sm text-gray-500">{proposal.description}</p>
          
          {/* Voting results */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-green-600">✓</span>
              <span>For: {formatVotes(proposal.votes.forVotes)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-600">✗</span>
              <span>Against: {formatVotes(proposal.votes.againstVotes)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-600">-</span>
              <span>Abstain: {formatVotes(proposal.votes.abstainVotes)}</span>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-400">
            Proposer: {proposal.proposer.address.slice(0, 6)}...{proposal.proposer.address.slice(-4)}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
