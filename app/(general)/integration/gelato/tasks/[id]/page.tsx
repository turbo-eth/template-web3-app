"use client"

import { TaskView } from "@/integrations/gelato"

export default function PageIntegration({
  params,
}: {
  params: { id: string }
}) {
  return <TaskView taskId={params.id} />
}
