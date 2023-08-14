import { getTaskFunctionData } from '../../utils/helpers'

export type FunctionDataProps = {
  functionData: ReturnType<typeof getTaskFunctionData>
}

export function FunctionData({ functionData }: FunctionDataProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <p className="col-span-2 opacity-70 md:col-span-1">Automated Function</p>
        <p className="col-span-2 md:col-span-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <span className="text-indigo-400">{functionData.func.name}</span>
              <span className="ml-1 flex flex-col space-x-1 md:flex-row">
                <span>(</span>
                {functionData.func.inputs.map((input, index) => (
                  <span key={index}>
                    <span className="ml-5 text-green-500 md:ml-0">{input.type}</span>
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
    </div>
  )
}
