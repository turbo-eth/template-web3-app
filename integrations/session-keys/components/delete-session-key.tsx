import type { Dispatch, SetStateAction } from 'react'

import { useSessionKeys } from '../hooks/use-session-keys'

interface DeleteSessionKeyProps {
  selectedSessionKey?: `0x${string}` | undefined
  setSelectedSessionKey?: Dispatch<SetStateAction<`0x${string}` | undefined>>
}

export function DeleteSessionKey({ selectedSessionKey, setSelectedSessionKey }: DeleteSessionKeyProps) {
  const { deleteSessionKey } = useSessionKeys()

  const handleDeleteSessionKey = () => {
    if (selectedSessionKey) {
      setSelectedSessionKey?.(undefined)
      deleteSessionKey(selectedSessionKey)
    }
  }

  return (
    <button disabled={!selectedSessionKey} className="btn btn-red disabled:opacity-50" onClick={handleDeleteSessionKey}>
      Delete Session Key
    </button>
  )
}
