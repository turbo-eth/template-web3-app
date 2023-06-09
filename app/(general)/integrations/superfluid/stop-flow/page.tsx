'use client'
import React from 'react'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import FormDeleteFlow from '@/integrations/superfluid/components/form-delete-flow'

export default function page() {
  return (
    <BranchIsWalletConnected>
      <FormDeleteFlow />
    </BranchIsWalletConnected>
  )
}
