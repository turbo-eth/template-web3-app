interface KeyPreviewProps {
  lockName: string
}
export default function KeyPreview({ lockName }: KeyPreviewProps) {
  return (
    <div className="bg-slate-500 m-4">
      <div className="p-2">
        <p>Lock Name: {lockName}</p>
      </div>
    </div>
  )
}
