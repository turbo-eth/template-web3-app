import { ChangeEvent, useMemo } from "react"
import { Abi } from "abitype"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { getAbiFunctions, validateInput } from "../../utils/helpers"
import { ValidationError } from "../errors/validation-error"
import { CreateTaskForm } from "./create-task"

export type ExecutionValuesProps = {
  inputFieldName: "predefinedInputs" | "resolverInputs"
  funcFieldName: "func" | "resolverFunc"
  abiFieldName: "abi" | "resolverAbi"
}

export function ExecutionValues({
  inputFieldName,
  funcFieldName,
  abiFieldName,
}: ExecutionValuesProps) {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<CreateTaskForm>()

  const [inputDefinition, func, abi, predefinedInputs] = watch([
    "inputDefinition",
    funcFieldName,
    abiFieldName,
    inputFieldName,
  ])

  const isResolver = funcFieldName === "resolverFunc"
  const shouldShowInputs = inputDefinition === "predefined" || isResolver

  const selectedFunctionAbi = useMemo(() => {
    if (!abi) return

    try {
      return getAbiFunctions(JSON.parse(abi) as Abi).find(
        (item) => item.name === func
      )
    } catch (e) {
      return
    }
  }, [abi, func])

  return (
    <div className="mt-10">
      {!isResolver && (
        <div className="mb-10 flex">
          <div className="mx-auto flex space-x-3 rounded-2xl p-2 dark:bg-zinc-700">
            <button
              type="button"
              className={cn(
                "rounded-2xl p-2 px-5 text-xl text-slate-200 duration-200 hover:text-inherit",
                inputDefinition === "predefined" ? "bg-zinc-900" : ""
              )}
              onClick={() => setValue("inputDefinition", "predefined")}
            >
              Predefined Inputs
            </button>
            <button
              type="button"
              className={cn(
                "rounded-2xl p-2 px-5 text-xl text-slate-200 duration-200 hover:text-inherit",
                inputDefinition === "resolver" ? "bg-zinc-900" : ""
              )}
              onClick={() => setValue("inputDefinition", "resolver")}
            >
              Resolver
            </button>
          </div>
        </div>
      )}
      {shouldShowInputs && selectedFunctionAbi && (
        <div className="flex flex-col space-y-5">
          {selectedFunctionAbi.inputs.map((item, index) => (
            <div key={index}>
              <label className="flex space-x-3">
                <span className="text-green-500">{item.type}</span>
                <span>{item.name}</span>
              </label>
              {item.name && (
                <>
                  <input
                    className="input mt-2 !rounded-2xl dark:bg-zinc-700 dark:text-white"
                    placeholder="value"
                    {...register(`${inputFieldName}.${item.name}`, {
                      validate: {
                        format: (value) =>
                          validateInput(
                            item.name as string,
                            value,
                            selectedFunctionAbi
                          ),
                      },
                      onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        setValue(inputFieldName, {
                          ...predefinedInputs,
                          [item.name as string]: e.target.value,
                        })
                      },
                    })}
                  />
                  <ValidationError
                    error={errors[inputFieldName]?.[item.name]?.message}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
