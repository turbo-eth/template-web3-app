import ButtonKeyCheckout from '@/integrations/unlock/components/button-key-checkout'
import LockStats from '@/integrations/unlock/components/lock-stats'

export default function UnlockLockPage({ params }: { params: { lockId: string } }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Lock Stats</h1>
      <LockStats lockId={params.lockId} />
      <ButtonKeyCheckout lockId={params.lockId} />
    </div>
  )
}
