import CopyToClipboard from "react-copy-to-clipboard"
import { FaCopy } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

interface OutputDataProps {
  data?: any
}

export function OutputData({ data }: OutputDataProps) {
  const { toast, dismiss } = useToast()

  const handleToast = () => {
    toast({
      title: "Data Copied",
      description: "The output has been copied to your clipboard.",
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }
  if (!data) return null

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="mb-2 font-semibold">Output</h4>
        <CopyToClipboard
          text={JSON.stringify(data, null, 2)}
          onCopy={handleToast}
        >
          <span className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
            <FaCopy className="text-muted-foreground" />
          </span>
        </CopyToClipboard>
      </div>
      <Textarea
        readOnly
        className="h-80"
        value={JSON.stringify(data, null, 2)}
      />
    </div>
  )
}
