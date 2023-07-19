interface LockPreviewProps {
  lockName: string
  lockAddress: string
}
export default function LockPreview({ lockName, lockAddress }: LockPreviewProps) {
  return (
    <div>
      <p>{lockName}</p>
      <p>{lockAddress}</p>
    </div>
  )
}
