import { Button } from "@/components/ui/button"

import { useSessionKeys } from "../hooks/use-session-keys"

export function CreateSessionKey() {
  const { createSessionKey } = useSessionKeys()

  const handleCreateSessionKey = async () => {
    // In this example, we're not providing an id for the session key, so it
    // will default to the address of the generated session key.
    // You can also provide an arbitrary unique string as the id.
    await createSessionKey()
  }

  return (
    <Button variant="default" onClick={handleCreateSessionKey}>
      Create Session Key
    </Button>
  )
}
