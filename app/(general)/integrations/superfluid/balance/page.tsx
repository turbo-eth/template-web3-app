'use client'
import React from 'react'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import FormDowngradeSupertoken from '@/integrations/superfluid/components/form-unwrap-supertoken'

export default function page() {
  return (
    <BranchIsWalletConnected>
      <FormDowngradeSupertoken />
    </BranchIsWalletConnected>
  )
}
