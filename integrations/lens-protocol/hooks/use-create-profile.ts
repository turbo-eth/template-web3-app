import { FormEvent, useState } from "react"
import { isValidHandle, useCreateProfile } from "@lens-protocol/react-web"

export const useCreateTestProfile = () => {
  const [handle, setHandle] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { execute: create, error: createError, isPending } = useCreateProfile()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!handle) return
    if (!isValidHandle(handle)) {
      setError("Handle is taken.")
      return
    }
    setHandle(null)
    await create({ handle })
  }

  return { error: error ?? createError, isPending, onSubmit, handle, setHandle }
}
