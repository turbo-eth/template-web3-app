'use client'
import React from 'react'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import FormSendFlow from '@/integrations/superfluid/components/form-send-flow'

export default function page() {
  return (
    <BranchIsWalletConnected>
      <FormSendFlow />
    </BranchIsWalletConnected>
  )
}
