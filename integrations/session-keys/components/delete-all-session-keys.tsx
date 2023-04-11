import { useSessionKeys } from '../hooks/use-session-keys'

export function DeleteAllSessionKeys() {
  const { sessionKeys, deleteAllSessionKeys } = useSessionKeys()

  const hasSessionKeys = sessionKeys && sessionKeys?.length > 0

  return (
    <button disabled={!hasSessionKeys} className="btn btn-red disabled:opacity-50" onClick={deleteAllSessionKeys}>
      Delete All Session Keys
    </button>
  )
}
