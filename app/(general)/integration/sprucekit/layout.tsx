'use client'

import { ReactNode } from 'react'

import { SpruceKitProvider } from '@/integrations/sprucekit/spruce-kit-provider'

export default function LayoutIntegration({ children }: { children: ReactNode }) {
  return <SpruceKitProvider>{children}</SpruceKitProvider>
}
