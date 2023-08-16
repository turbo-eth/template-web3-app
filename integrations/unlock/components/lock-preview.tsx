interface LockPreviewProps {
  lockId: string
  lockName: string
}
export default function LockPreview({ lockId, lockName }: LockPreviewProps) {
  return (
    <a href={`/integration/unlock/${lockId}`}>
      <div className="card">
        <div>
          <p className="font-bold">{lockName}</p>
        </div>
      </div>
    </a>
  )
}
