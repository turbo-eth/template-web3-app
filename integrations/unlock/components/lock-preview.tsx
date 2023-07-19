interface LockPreviewProps {
  lockId: string
  lockName: string
}
export default function LockPreview({ lockId, lockName }: LockPreviewProps) {
  return (
    <a href={`/integration/unlock/${lockId}`}>
      <div className="bg-slate-500 m-4">
        <div className="p-2">
          <p>Lock Name: {lockName}</p>
        </div>
      </div>
    </a>
  )
}
