import { useSessionKeys } from '../hooks/use-session-keys'

export function CreateSessionKey() {
  const { createSessionKey } = useSessionKeys()

  return (
    <button className="btn btn-emerald" onClick={createSessionKey}>
      Create Session Key
    </button>
  )
}
