export default function UnlockLockPage({ params }: { params: { lockId: string } }) {
  return (
    <div>
      <p>Unlock Lock Page</p>
      <p>Lock ID: {params.lockId}</p>
    </div>
  )
}