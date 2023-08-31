import { useMemo, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { useFormContext } from "react-hook-form"
import { FaCopy } from "react-icons/fa"

import { getFunctionSignature, truncateEthAddress } from "../../utils/helpers"
import { CreateTaskForm } from "./create-task"

export function RestrictionInfo({
  dedicatedMsgSender,
}: {
  dedicatedMsgSender?: string
}) {
  const [copied, setCopied] = useState(false)

  const { watch } = useFormContext<CreateTaskForm>()

  const [abi, func] = watch(["abi", "func"])

  const functionSignature = useMemo(() => {
    if (!abi || !func) return false

    return getFunctionSignature(abi, func)
  }, [abi, func])

  return (
    <div className="card mx-auto mt-10 w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
      <div className="leading-6 text-orange-300">
        If the <span className="text-indigo-400">{functionSignature}</span>{" "}
        function has access restrictions, whitelist this address as a{" "}
        <span className="text-indigo-400">msg.sender</span>
      </div>
      <CopyToClipboard
        text={dedicatedMsgSender || ""}
        onCopy={() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)
        }}
      >
        <div className="mt-3 flex cursor-pointer space-x-3 text-lg">
          {copied ? (
            <>Copied!</>
          ) : (
            <>
              <span>{truncateEthAddress(dedicatedMsgSender || "", 20)}</span>{" "}
              <FaCopy />
            </>
          )}
        </div>
      </CopyToClipboard>
    </div>
  )
}
