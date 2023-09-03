import { Button } from "@/components/ui/button"

import { useSessionKeys } from "../hooks/use-session-keys"

export function DeleteAllSessionKeys() {
  const { sessionKeys, deleteAllSessionKeys } = useSessionKeys()

  const hasSessionKeys = sessionKeys && sessionKeys?.length > 0

  return (
    <Button
      variant="destructive"
      disabled={!hasSessionKeys}
      onClick={deleteAllSessionKeys}
    >
      Delete All Session Keys
    </Button>
  )
}
