import { InputValues } from './input-values'
import { getTaskFunctionData } from '../../utils/helpers'

export type ResolverValuesProps = {
  functionData: ReturnType<typeof getTaskFunctionData>
  resolverAddress: string
}

export function ResolverValues({ functionData, resolverAddress }: ResolverValuesProps) {
  return (
    <div>
      <div className="mb-5 flex w-full items-center justify-between opacity-70">
        <h3 className="text-2xl font-bold">When to execute</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <p className="col-span-2 opacity-70 md:col-span-1">Resolver Address</p>
        <p className="col-span-2 md:col-span-3">{resolverAddress}</p>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-4">
        <p className="col-span-2 opacity-70 md:col-span-1">Resolver Function</p>
        <p className="col-span-2 md:col-span-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <span className="text-indigo-400">{functionData.func.name}</span>
              <span className="ml-1 flex space-x-1">
                <span>(</span>
                {functionData.func.inputs.map((input, index) => (
                  <span key={index}>
                    <span className="text-green-500">{input.type}</span>
                    <span>: </span>
                    <span key={input.name} className="dark:text-slate-100">
                      {input.name}
                    </span>
                    {index < functionData.func.inputs.length - 1 && <span>,</span>}
                  </span>
                ))}
                <span>)</span>
              </span>
            </div>
          </div>
        </p>
      </div>
      <div className="mt-3">
        <InputValues functionData={functionData} />
      </div>
    </div>
  )
}
