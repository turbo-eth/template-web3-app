interface KeyPreviewProps {
  lockName: string | undefined | null
}
export default function KeyPreview({ lockName }: KeyPreviewProps) {
  return (
    <div className="card">
      <div className="p-2">
        <p className="font-bold">{lockName}</p>
      </div>
    </div>
  )
}
