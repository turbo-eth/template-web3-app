interface KeyPreviewProps {
  lockName: string | undefined | null
}
export default function KeyPreview({ lockName }: KeyPreviewProps) {
  return (
    <div className="card m-4">
      <div>
        <p className="font-bold">{lockName}</p>
      </div>
    </div>
  )
}
