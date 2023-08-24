import { useSessionKeys } from "../hooks/use-session-keys"

export function DeleteAllSessionKeys() {
  const { sessionKeys, deleteAllSessionKeys } = useSessionKeys()

  const hasSessionKeys = sessionKeys && sessionKeys?.length > 0

  return (
    <button
      className="btn btn-red"
      disabled={!hasSessionKeys}
      onClick={deleteAllSessionKeys}
    >
      Delete All Session Keys
    </button>
  )
}
