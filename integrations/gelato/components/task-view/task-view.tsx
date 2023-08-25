import { useMemo, useState } from "react"
import Link from "next/link"
import moment from "moment"
import { FaEdit, FaExternalLinkAlt, FaTimesCircle } from "react-icons/fa"
import { FiChevronLeft } from "react-icons/fi"
import { useNetwork } from "wagmi"

import { useAbi, useTask } from "../../hooks"
import { useTaskResolver } from "../../hooks/use-task-resolver"
import {
  formatFee,
  getAddressUrl,
  getTaskFunctionData,
  truncateEthAddress,
} from "../../utils/helpers"
import { decodeModuleArgs } from "../../utils/resolverDecoder"
import { RenameTask } from "../rename-task"
import { ExecutingAddress } from "./executing-address"
import { FunctionData } from "./function-data"
import { InputValues } from "./input-values"
import { IntervalValues } from "./interval-values"
import { PaymentInfo } from "./payment-info"
import { ResolverValues } from "./resolver-values"

export type TasKViewProps = {
  taskId: string
}

export function TaskView({ taskId }: TasKViewProps) {
  const [showRename, setShowRename] = useState(false)

  const { data: taskWithName, isLoading, refetch } = useTask({ taskId })
  const { chain } = useNetwork()

  const { data: abi } = useAbi({
    contractAddress: taskWithName?.task.execAddress as string,
  })

  const { data: taskResolver } = useTaskResolver({ taskId })

  const { data: resolverAbi } = useAbi({
    contractAddress: taskResolver?.address as string,
  })

  const functionData = useMemo(() => {
    if (!taskWithName) return

    const { moduleArgs, modules } = taskWithName.task

    const decodedArgs = decodeModuleArgs(
      moduleArgs as string[],
      modules as number[]
    )

    if (taskResolver && resolverAbi && taskResolver.address) {
      return {
        args: decodedArgs,
        data: getTaskFunctionData(
          taskResolver.address,
          resolverAbi,
          decodedArgs.resolverData as string
        ),
      }
    }

    if (!abi) return

    return {
      args: decodedArgs,
      data: getTaskFunctionData(
        taskWithName.task.execAddress,
        abi,
        taskWithName.task.execDataOrSelector as string
      ),
    }
  }, [abi, taskWithName, taskResolver, resolverAbi])

  const handleRename = () => {
    setShowRename(false)
    refetch().catch((e) => console.error(e))
  }

  if (isLoading || !taskWithName) {
    return (
      <div className="mx-auto h-20 w-full max-w-4xl animate-pulse rounded-lg bg-slate-400/70"></div>
    )
  }

  const { task, name } = taskWithName

  return (
    <div className="w-full">
      <div className="mx-auto mb-5 flex w-full max-w-4xl flex-col">
        <div>
          <Link
            className="flex items-center space-x-2 text-indigo-400"
            href={"/integration/gelato"}
          >
            <FiChevronLeft />
            Back
          </Link>
        </div>
        <div className="mt-10">
          <div className="flex items-center space-x-5">
            <h2 className="text-2xl font-bold">
              {truncateEthAddress(name, 30)}
            </h2>
            <div>
              {showRename ? (
                <FaTimesCircle
                  className="cursor-pointer opacity-50 duration-200 hover:opacity-100"
                  size={24}
                  onClick={() => setShowRename(false)}
                />
              ) : (
                <FaEdit
                  className="cursor-pointer opacity-50 duration-200 hover:opacity-100"
                  size={24}
                  onClick={() => setShowRename(true)}
                />
              )}
            </div>
            <div>
              <span className="pointer-events-none rounded-2xl bg-black/50 px-2 py-1 pr-3 text-xs font-normal">
                <i
                  className={`mr-0.5 ${
                    task.status == "ongoing" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {" "}
                  •&nbsp;{" "}
                </i>
                {task.status}
              </span>
            </div>
          </div>
          {showRename && (
            <RenameTask
              name={name}
              taskId={taskId}
              onSave={() => handleRename()}
            />
          )}
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            <span>Created By:</span>
            <span>
              <a
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-200 to-pink-200 bg-clip-text text-transparent"
                href={getAddressUrl(task.taskCreator.id, chain?.id as number)}
                target="_blank"
              >
                <span>{truncateEthAddress(task.taskCreator.id, 20)}</span>
                <FaExternalLinkAlt className="text-pink-200" />
              </a>
            </span>
            <span className="opacity-50">
              {moment.unix(task.createdAt as number).format("ll, HH:mm:ss")}
            </span>
          </div>
          <div className="mt-4">
            <span className="break-words opacity-50">Task ID: {taskId}</span>
          </div>
          <div className="mt-6 flex space-x-5">
            <div>
              <div className="text-2xl font-bold">{task.executionCount}</div>
              <div className="mt-1 opacity-50">Executions</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                ${" "}
                {task.feeTotalUsd
                  ? formatFee(task.feeTotalUsd as string)
                  : "0.00"}
              </div>
              <div className="mt-1 opacity-50">Cost</div>
            </div>
          </div>
        </div>
        <div className="card mx-auto mt-10 w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
          <div className="flex flex-col space-y-5">
            <div>
              <div className="mb-5 flex w-full items-center justify-between opacity-70">
                <h3 className="text-2xl font-bold">Execute</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <p className="col-span-2 opacity-70 md:col-span-1">
                  Target Contract
                </p>
                <p className="col-span-2 md:col-span-3">
                  <div className="flex items-center space-x-3">
                    <a
                      className="bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-transparent duration-200 hover:opacity-50"
                      href={getAddressUrl(
                        task.execAddress,
                        chain?.id as number
                      )}
                      target="_blank"
                    >
                      <span>{truncateEthAddress(task.execAddress, 12)}</span>
                    </a>
                    <FaExternalLinkAlt className="opacity-50" />
                  </div>
                </p>
              </div>
            </div>
            {!taskResolver?.address ? (
              <>
                {functionData && (
                  <FunctionData functionData={functionData.data} />
                )}
                <hr className="!mb-5 !mt-10" />
                {functionData && (
                  <InputValues functionData={functionData.data} />
                )}
                <hr className="!mb-5 !mt-10" />
                <IntervalValues
                  createdAt={task.createdAt}
                  interval={functionData?.args.interval}
                  startTime={functionData?.args.startTime}
                />
              </>
            ) : (
              <>
                <hr className="!mb-5 !mt-10" />
                {functionData && (
                  <ResolverValues
                    functionData={functionData.data}
                    resolverAddress={taskResolver.address}
                  />
                )}
              </>
            )}
            <hr className="!mb-5 !mt-10" />
            <PaymentInfo useTaskTreasuryFunds={task.useTaskTreasuryFunds} />
            <hr className="!mb-5 !mt-10" />
            <ExecutingAddress />
          </div>
        </div>
      </div>
    </div>
  )
}
