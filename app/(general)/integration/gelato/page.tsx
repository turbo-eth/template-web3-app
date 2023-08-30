"use client"

import Link from "next/link"

import { ActiveTasks } from "@/integrations/gelato"

export default function PageIntegration() {
  return (
    <>
      <div className="mb-10 flex w-full max-w-4xl">
        <Link
          className="btn btn-blue ml-auto !rounded-2xl"
          href={"/integration/gelato/tasks/create"}
        >
          Create Task
        </Link>
      </div>
      <ActiveTasks />
    </>
  )
}
