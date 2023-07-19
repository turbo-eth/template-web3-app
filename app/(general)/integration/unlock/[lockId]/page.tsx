import LockStats from '@/integrations/unlock/components/lock-stats'

export default function UnlockLockPage({ params }: { params: { lockId: string } }) {
  return (
    <div>
      <LockStats lockId={params.lockId} />
    </div>
  )
}