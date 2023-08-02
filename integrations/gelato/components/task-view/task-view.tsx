import { useMemo } from 'react'

import moment from 'moment'
import Link from 'next/link'
import { FaEdit, FaExternalLinkAlt } from 'react-icons/fa'
import { FiChevronLeft } from 'react-icons/fi'
import { useNetwork } from 'wagmi'

import { ExecutingAddress } from './executing-address'
import { FunctionData } from './function-data'
import { InputValues } from './input-values'
import { PaymentInfo } from './payment-info'
import { ResolverValues } from './resolver-values'
import { useAbi, useTask } from '../../hooks'
import { useTaskResolver } from '../../hooks/use-task-resolver'
import { getAddressUrl, getTaskFunctionData } from '../../utils/helpers'
import { decodeModuleArgs } from '../../utils/resolverDecoder'

export type TasKViewProps = {
  taskId: string
}

export function TaskView({ taskId }: TasKViewProps) {
  const { data: taskWithName, isLoading, isFetching } = useTask({ taskId })
  const { chain } = useNetwork()

  const { data: abi } = useAbi({ contractAddress: taskWithName?.task.execAddress as string })

  const { data: taskResolver } = useTaskResolver({ taskId })

  const { data: resolverAbi } = useAbi({ contractAddress: taskResolver?.address as string })

  const functionData = useMemo(() => {
    if (!taskWithName) return

    if (taskResolver && resolverAbi && taskResolver.address) {
      const { moduleArgs, modules } = taskWithName.task

      const decoded = decodeModuleArgs(moduleArgs as string[], modules as number[])

      return getTaskFunctionData(taskResolver.address, resolverAbi, decoded?.resolverData as string)
    }

    if (!abi) return

    return getTaskFunctionData(taskWithName.task.execAddress, abi, taskWithName.task.execDataOrSelector as string)
  }, [abi, taskWithName, taskResolver, resolverAbi])

  if (isLoading || !taskWithName) {
    return <div className="mx-auto h-20 w-full max-w-4xl animate-pulse rounded-lg bg-slate-400/70"></div>
  }

  const { task, name } = taskWithName

  return (
    <div className="w-full">
      <div className="mx-auto mb-5 flex w-full max-w-4xl flex-col">
        <div>
          <Link className="flex items-center space-x-2 text-indigo-400" href={'/integration/gelato'}>
            <FiChevronLeft />
            Back
          </Link>
        </div>
        <div className="mt-10">
          <div className="flex items-center space-x-5">
            <h2 className="text-2xl font-bold">{name}</h2>
            <div>
              <FaEdit className="cursor-pointer opacity-50 duration-200 hover:opacity-100" size={24} />
            </div>
            <div>
              <span className="pointer-events-none rounded-2xl bg-black/50 px-2 py-1 pr-3 text-xs font-normal">
                <i className={`mr-0.5 ${task.status == 'ongoing' ? 'text-green-500' : 'text-red-500'}`}> •&nbsp; </i>
                {task.status}
              </span>
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <span>Created By:</span>
            <span>
              <a
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-200 to-pink-200 bg-clip-text text-transparent"
                href={getAddressUrl(task.taskCreator.id, chain?.id as number)}
                target="_blank">
                <span>{task.taskCreator.id}</span>
                <FaExternalLinkAlt className="text-pink-200" />
              </a>
            </span>
            <span className="opacity-50">{moment(task.createdAt as number).format('ll, HH:mm:ss')}</span>
          </div>
          <div className="mt-4">
            <span className="opacity-50">Task ID: {taskId}</span>
          </div>
        </div>
        <div className="card mx-auto mt-10 w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
          <div className="flex flex-col space-y-5">
            <div>
              <div className="mb-5 flex w-full items-center justify-between opacity-70">
                <h3 className="text-2xl font-bold">Execute</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <p className="col-span-2 opacity-70 md:col-span-1">Target Contract</p>
                <p className="col-span-2 md:col-span-3">
                  <div className="flex items-center space-x-3">
                    <a
                      className="bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-transparent duration-200 hover:opacity-50"
                      href={getAddressUrl(task.execAddress, chain?.id as number)}
                      target="_blank">
                      <span>{task.execAddress}</span>
                    </a>
                    <FaExternalLinkAlt className="opacity-50" />
                  </div>
                </p>
              </div>
            </div>
            {!taskResolver?.address ? (
              <>
                {functionData && <FunctionData functionData={functionData} />}
                <hr className="!mt-10 !mb-5" />
                {functionData && <InputValues functionData={functionData} />}
              </>
            ) : (
              <>
                <hr className="!mt-10 !mb-5" />
                {functionData && <ResolverValues functionData={functionData} resolverAddress={taskResolver.address} />}
              </>
            )}
            <hr className="!mt-10 !mb-5" />
            <PaymentInfo useTaskTreasuryFunds={task.useTaskTreasuryFunds} />
            <hr className="!mt-10 !mb-5" />
            <ExecutingAddress />
          </div>
        </div>
      </div>
    </div>
  )
}
