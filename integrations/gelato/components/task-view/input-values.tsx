import { getTaskFunctionData } from '../../utils/helpers'

export type InputValuesProps = {
  functionData: ReturnType<typeof getTaskFunctionData>
}

export function InputValues({ functionData }: InputValuesProps) {
  return (
    <div>
      <p className="opacity-70">Input Values</p>
      {functionData.func.inputs.map((item, index) => (
        <div key={index} className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-4">
          <p className="col-span-2 opacity-70 md:col-span-1">
            <span className="text-green-500">{item.type}</span>
            <span className="ml-1 opacity-70">{item.name}</span>
          </p>
          <p className="col-span-2 break-words md:col-span-3">{String(functionData.data[index])}</p>
        </div>
      ))}
    </div>
  )
}
