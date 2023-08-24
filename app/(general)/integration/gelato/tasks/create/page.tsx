"use client"

import Link from "next/link"
import { FiChevronLeft } from "react-icons/fi"

import { CreateTask } from "@/integrations/gelato"

export default function PageIntegration() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full !max-w-4xl">
        <Link
          className="flex items-center space-x-2 text-indigo-400"
          href={"/integration/gelato"}
        >
          <FiChevronLeft />
          Cancel
        </Link>
      </div>
      <h3 className="text-center text-xl font-bold">New Task</h3>
      <CreateTask />
    </div>
  )
}
