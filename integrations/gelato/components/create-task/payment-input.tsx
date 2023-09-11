import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { GELATO_CONSTANTS } from "../../utils/constants"
import { CreateTaskForm } from "./create-task"

export function PaymentInput() {
  const { watch, setValue } = useFormContext<CreateTaskForm>()

  const [payWith] = watch(["payWith"])

  return (
    <div className="mx-auto mt-10 w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
      <div className="mb-10 flex w-full items-center justify-between">
        <h3 className="text-2xl font-bold dark:opacity-70">Pay with</h3>
      </div>

      <div>
        <div>
          Choose how the task should be paid for. The cost of each execution
          equals the network fee
        </div>
        <div>
          <a
            className="text-indigo-400"
            href={GELATO_CONSTANTS.docs.payment}
            target="_blank"
          >
            Docs
          </a>
        </div>
        <div className="mt-10 flex">
          <div className="mx-auto flex space-x-3 rounded-2xl p-2 dark:bg-zinc-700">
            <button
              className={cn(
                "rounded-2xl p-2 px-5 text-xl text-slate-200 duration-200 hover:text-inherit",
                payWith === "gelato" ? "bg-zinc-900" : ""
              )}
              type="button"
              onClick={() => setValue("payWith", "gelato")}
            >
              Gelato Balance
            </button>
            <button
              type="button"
              className={cn(
                "rounded-2xl p-2 px-5 text-xl text-slate-200 duration-200 hover:text-inherit",
                payWith === "transaction" ? "bg-zinc-900" : ""
              )}
              onClick={() => setValue("payWith", "transaction")}
            >
              Transaction pays itself
            </button>
          </div>
        </div>
        {payWith === "transaction" && (
          <div className="mt-10">
            The fees will be taken from the address of the automated contract.{" "}
            <a
              className="text-indigo-400"
              href={`${GELATO_CONSTANTS.docs.payment}#transaction-pays-for-itself`}
              target="_blank"
            >
              Docs
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
