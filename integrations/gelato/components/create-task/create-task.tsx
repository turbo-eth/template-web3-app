import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreateTaskOptions } from "@gelatonetwork/automate-sdk"
import { ethers } from "ethers"
import moment from "moment"
import { FormProvider, useForm } from "react-hook-form"
import { FaExternalLinkAlt, FaSpinner } from "react-icons/fa"
import { useNetwork } from "wagmi"

import { useEthersSigner } from "@/lib/hooks/web3/use-ethers-signer"
import { Button } from "@/components/ui/button"

import { useNewTask } from "../../hooks"
import { useMsgSender } from "../../hooks/use-msg-sender"
import {
  getFunctionSignature,
  getTotalInterval,
  getTransactionUrl,
  sortInputsByOrder,
} from "../../utils/helpers"
import { ContractInput } from "./contract-input"
import { ExecutionValues } from "./execution-values"
import { FunctionInput } from "./function-input"
import { useWizard } from "./hooks/use-wizard"
import { IntervalInput } from "./interval-input"
import { PaymentInput } from "./payment-input"
import { ResolverInput } from "./resolver-input"
import { RestrictionInfo } from "./restriction-info"
import { TaskNameInput } from "./task-name-input"

export type CreateTaskForm = {
  contractAddress: string
  abi: string
  func: string
  inputDefinition: "predefined" | "resolver"
  predefinedInputs?: { [key: string]: string }
  resolverContractAddress: string
  resolverAbi: string
  resolverFunc: string
  resolverInputs?: { [key: string]: string }
  timeOption: "exact" | "whenever_possible"
  timeInterval: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
  startTime: string
  startImmediately: boolean
  payWith: "gelato" | "transaction"
  name: string
}

export function CreateTask() {
  const [createTx, setCreateTx] = useState<ethers.ContractTransaction>()
  const [createTxWaiting, setCreateTxWaiting] = useState(false)

  const form = useForm<CreateTaskForm>({
    mode: "all",
    defaultValues: {
      inputDefinition: "predefined",
      timeOption: "exact",
      startImmediately: true,
      startTime: moment().format("YYYY-MM-DDTHH:mm:ss"),
      payWith: "gelato",
    },
  })

  const { chain } = useNetwork()

  const router = useRouter()

  const signer = useEthersSigner()

  const {
    isLoading: createTaskIsLoading,
    isError: createTaskIsError,
    mutateAsync: createTask,
  } = useNewTask()

  const {
    shouldShowFunction,
    shouldShowInputs,
    shouldShowRestrictionInfo,
    shouldShowIntervalInput,
    shouldShowPayment,
    shouldShowResolverInputs,
    isValid,
  } = useWizard(form)

  const { data: dedicatedMsgSender } = useMsgSender()

  const onSubmit = async () => {
    const values = form.getValues()

    const contract = new ethers.Contract(
      values.contractAddress,
      values.abi,
      signer
    )

    const { days, hours, minutes, seconds } = values.timeInterval || {}

    let taskData: CreateTaskOptions = {
      name: values.name,
      execAddress: values.contractAddress,
      execSelector: contract.interface.getSighash(
        getFunctionSignature(values.abi, values.func)
      ),
      interval:
        shouldShowIntervalInput && values.timeOption === "exact"
          ? getTotalInterval(days, hours, minutes, seconds)
          : undefined,
      startTime:
        values.startImmediately || values.timeOption === "whenever_possible"
          ? undefined
          : moment(values.startTime).unix(),
      useTreasury: values.payWith !== "transaction",
      dedicatedMsgSender: false,
    }

    if (values.inputDefinition === "predefined") {
      taskData = {
        ...taskData,
        execAbi: values.abi,
        execData: contract.interface.encodeFunctionData(
          values.func,
          sortInputsByOrder(values.func, values.abi, values.predefinedInputs)
        ),
      }
    } else {
      const resolverContract = new ethers.Contract(
        values.resolverContractAddress,
        values.resolverAbi,
        signer
      )

      taskData = {
        ...taskData,
        resolverAddress: values.resolverContractAddress,
        resolverAbi: values.resolverAbi,
        resolverData: resolverContract.interface.encodeFunctionData(
          values.resolverFunc,
          sortInputsByOrder(
            values.resolverFunc,
            values.resolverAbi,
            values.resolverInputs
          )
        ),
      }
    }

    setCreateTxWaiting(true)
    const task = await createTask({
      args: taskData,
    })

    setCreateTx(task.tx)
    await task.tx.wait()
    setCreateTxWaiting(false)
    router.push(`/integration/gelato/tasks/${task.taskId || ""}`)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto mt-10 w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
          <div className="mb-10 flex w-full items-center justify-between">
            <h3 className="text-2xl font-bold dark:opacity-70">Execute</h3>
          </div>
          <ContractInput
            abiFieldName="abi"
            contractFieldName="contractAddress"
          />
          {shouldShowFunction && (
            <FunctionInput
              abiFieldName="abi"
              funcFieldName="func"
              inputsFieldName="predefinedInputs"
            />
          )}
          {shouldShowInputs && (
            <ExecutionValues
              abiFieldName="abi"
              funcFieldName="func"
              inputFieldName="predefinedInputs"
            />
          )}
        </div>
        {shouldShowResolverInputs && <ResolverInput />}
        {shouldShowRestrictionInfo && (
          <RestrictionInfo dedicatedMsgSender={dedicatedMsgSender?.address} />
        )}
        {shouldShowIntervalInput && <IntervalInput />}
        {shouldShowPayment && (
          <>
            <PaymentInput />
            <TaskNameInput />
            <div className="mt-10 flex w-full">
              <Button
                variant="blue"
                className="mx-auto rounded-full"
                disabled={!isValid || createTaskIsLoading}
                type="submit"
              >
                <span className="flex items-center space-x-2">
                  {createTaskIsLoading && (
                    <FaSpinner className="animate-spin" />
                  )}
                  <span>Create Task</span>
                </span>
              </Button>
            </div>
          </>
        )}

        {createTx && createTxWaiting && (
          <div className="flex w-full">
            <div className="mx-auto mt-5 w-48 rounded-2xl border p-5 text-sm">
              <div>Transaction Started</div>
              <div className="mt-3">
                <a
                  className="flex items-center space-x-1 text-indigo-400"
                  href={getTransactionUrl(createTx, chain?.id as number)}
                  target="_blank"
                >
                  <span>Explorer</span>
                  <FaExternalLinkAlt />
                </a>
              </div>
              <div className="mt-3">
                {moment(createTx.timestamp).format("ll, HH:mm:ss")}
              </div>
              <div className="mt-5">
                <FaSpinner className="animate-spin" />
              </div>
            </div>
          </div>
        )}
        {createTaskIsError && (
          <div className="mt-3 text-center text-red-500">
            Error creating task, please try again
          </div>
        )}
      </form>
    </FormProvider>
  )
}
