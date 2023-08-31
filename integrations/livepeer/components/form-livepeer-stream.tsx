"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

interface livepeerForm {
  streamId: string
}

export function FormLivepeerStream() {
  const route = useRouter()
  const { register, handleSubmit } = useForm<livepeerForm>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [streamId, setStreamId] = useState<string>("")

  function onSubmit(FieldValues: livepeerForm) {
    setIsLoading(true)
    if (FieldValues.streamId !== "") {
      route.push(`/integration/livepeer/livestream/${FieldValues.streamId}`)
    }
  }
  return (
    <div className="card w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Stream ID</label>
        <input
          required
          className="input mt-4"
          {...register("streamId")}
          value={streamId}
          onChange={(e) => setStreamId(e.target.value)}
        />
        <Button
          variant="emerald"
          className="mt-4 w-full"
          disabled={!streamId || isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  )
}
