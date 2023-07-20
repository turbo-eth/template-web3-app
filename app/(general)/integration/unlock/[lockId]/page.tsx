import LockStats from '@/integrations/unlock/components/lock-stats'
import ButtonKeyCheckout from '@/integrations/unlock/components/button-key-checkout'

export default function UnlockLockPage({ params }: { params: { lockId: string } }) {
  return (
    <div>
      <LockStats lockId={params.lockId} />
      <ButtonKeyCheckout lockId={params.lockId} />
    </div>
  )
}
