'use client'

import Link from 'next/link'

import { CreateTask } from '@/integrations/gelato'

export default function PageIntegration() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full !max-w-4xl">
        <Link href={'/integration/gelato'}>Cancel</Link>
      </div>
      <h3 className="text-center text-xl font-bold">New Task</h3>
      <CreateTask />
    </div>
  )
}
