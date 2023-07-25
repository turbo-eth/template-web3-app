import LockStats from '@/integrations/unlock/components/lock-stats'
import ButtonKeyCheckout from '@/integrations/unlock/components/button-key-checkout'

export default function UnlockLockPage({ params }: { params: { lockId: string } }) {
  return (
    <div>
      <h1 className="text-center font-bold">Lock Stats</h1>
      <LockStats lockId={params.lockId} />
      <ButtonKeyCheckout lockId={params.lockId} />
    </div>
  )
}
