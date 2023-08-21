import { useMemo } from 'react'

import { Abi } from 'abitype'
import { useFormContext } from 'react-hook-form'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { CreateTaskForm } from './create-task'
import { getAbiFunctions } from '../../utils/helpers'

export type FunctionInputProps = {
  abiFieldName: 'abi' | 'resolverAbi'
  funcFieldName: 'func' | 'resolverFunc'
  inputsFieldName: 'predefinedInputs' | 'resolverInputs'
}
export function FunctionInput({ abiFieldName, funcFieldName, inputsFieldName }: FunctionInputProps) {
  const { watch, setValue } = useFormContext<CreateTaskForm>()

  const [formAbi] = watch([abiFieldName])

  const abiFunctions = useMemo(() => {
    if (!formAbi) return

    try {
      return getAbiFunctions(JSON.parse(formAbi) as Abi)
    } catch (e) {
      return
    }
  }, [formAbi])

  return (
    <div className="mt-8">
      <label className="dark:opacity-70" htmlFor="execute_function">
        {funcFieldName === 'func' ? 'Function to be automated' : 'Function to be called at the resolver (to check task status)'}
      </label>
      <Select
        onValueChange={(value) => {
          setValue(funcFieldName, value)
          setValue(inputsFieldName, {})
        }}>
        <SelectTrigger className="mt-2 rounded-2xl" id="execute_function">
          <SelectValue placeholder="Select a function" />
        </SelectTrigger>
        <SelectContent avoidCollisions={false} className="max-w-full rounded-2xl dark:!bg-zinc-700">
          {abiFunctions?.map((item, ind) => (
            <SelectItem key={ind} className="cursor-pointer duration-200 hover:!bg-black/10" value={item.name}>
              <div className="flex items-center py-3">
                <span className="text-indigo-400">{item.name}</span>
                <span className="ml-1 flex flex-col space-x-1 md:flex-row">
                  <span>(</span>
                  {item.inputs.map((input, index) => (
                    <span key={index}>
                      <span className="ml-5 text-green-500 md:ml-0">{input.type}</span>
                      <span>:</span>
                      <span key={input.name} className="dark:text-slate-100">
                        {input.name}
                      </span>
                      {index < item.inputs.length - 1 && <span>,</span>}
                    </span>
                  ))}
                  <span>)</span>
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
