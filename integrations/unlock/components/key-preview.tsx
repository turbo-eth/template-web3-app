interface KeyPreviewProps {
  lockName: string | undefined | null
  lockId: string
}
export default function KeyPreview({ lockName, lockId }: KeyPreviewProps) {
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
