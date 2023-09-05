interface LockPreviewProps {
  lockId: string
  lockName: string | undefined | null
}
export default function LockPreview({ lockId, lockName }: LockPreviewProps) {
  return (
    <a href={`/integration/unlock/${lockId}`}>
      <div className="card m-4">
        <div>
          <p className="font-bold">{lockName}</p>
        </div>
      </div>
    </a>
  )
}
