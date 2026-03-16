'use client'

import { useState } from 'react'

import { TallyGovernorsList } from '@/integrations/tally/components/tally-governors-list'
import { TallyProposalsList } from '@/integrations/tally/components/tally-proposals-list'
import { TallyDelegatesList } from '@/integrations/tally/components/tally-delegates-list'
import { useDaoInfo } from '@/integrations/tally/tally-client'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TallyDaoDashboardProps {
  initialGovernorId?: string
  className?: string
}

export function TallyDaoDashboard({ initialGovernorId, className }: TallyDaoDashboardProps) {
  const [selectedGovernorId, setSelectedGovernorId] = useState<string | null>(initialGovernorId || null)
  const { data: daoInfo } = useDaoInfo(selectedGovernorId || '')

  return (
    <div className={cn('space-y-6', className)}>
      {!selectedGovernorId ? (
        <TallyGovernorsList onSelectGovernor={setSelectedGovernorId} />
      ) : (
        <>
          {/* DAO Header */}
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setSelectedGovernorId(null)}
                className="mb-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ← Back to DAOs
              </button>
              <h2 className="text-2xl font-bold">{daoInfo?.name || 'DAO'}</h2>
              <p className="text-sm text-gray-500">
                {daoInfo?.token.name} ({daoInfo?.token.symbol})
              </p>
            </div>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="proposals" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="delegates">Delegates</TabsTrigger>
            </TabsList>
            <TabsContent value="proposals">
              <TallyProposalsList governorId={selectedGovernorId} />
            </TabsContent>
            <TabsContent value="delegates">
              <TallyDelegatesList governorId={selectedGovernorId} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
