export function ValidationError({ error }: { error?: string }) {
  if (!error) return <></>

  return <div className="mt-2 text-red-300">× {error}</div>
}
