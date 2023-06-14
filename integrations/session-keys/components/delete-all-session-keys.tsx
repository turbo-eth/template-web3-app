import { Button } from '@/components/ui/button'

import { useSessionKeys } from '../hooks/use-session-keys'

export function DeleteAllSessionKeys() {
  const { sessionKeys, deleteAllSessionKeys } = useSessionKeys()

  const hasSessionKeys = sessionKeys && sessionKeys?.length > 0

  return (
    <Button disabled={!hasSessionKeys} className="btn btn-red dark:bg-red-700 dark:text-red-50" onClick={deleteAllSessionKeys}>
      Delete All Session Keys
    </Button>
  )
}
