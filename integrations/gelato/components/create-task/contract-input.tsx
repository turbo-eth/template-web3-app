import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { FiChevronLeft } from "react-icons/fi"
import { isAddress } from "viem"

import { useAbi } from "../../hooks"
import { isValidAbi } from "../../utils/helpers"
import { ValidationError } from "../errors/validation-error"
import { CreateTaskForm } from "./create-task"

export type ContractInputProps = {
  contractFieldName: "contractAddress" | "resolverContractAddress"
  abiFieldName: "abi" | "resolverAbi"
}

export function ContractInput({
  contractFieldName,
  abiFieldName,
}: ContractInputProps) {
  const [isCustomAbi, setIsCustomAbi] = useState(false)

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useFormContext<CreateTaskForm>()

  const contractAddress = watch(contractFieldName)

  const {
    data: abi,
    isLoading: isAbiLoading,
    isError: isAbiError,
  } = useAbi({ contractAddress })

  useEffect(() => {
    if (contractAddress) {
      if (abiFieldName === "abi") {
        reset()
      } else {
        setValue("resolverFunc", "")
        setValue("resolverAbi", "")
        setValue("resolverInputs", {})
      }
      setValue(contractFieldName, contractAddress)
      setIsCustomAbi(false)
    }
  }, [contractAddress])

  useEffect(() => {
    if (abi) setValue(abiFieldName, abi)
  }, [abi])

  const isValidationError = !contractAddress || errors.contractAddress
  const shouldShowAbiInput = contractAddress && (isAbiError || isCustomAbi)

  return (
    <div>
      <label className="dark:opacity-70" htmlFor="contract_address">
        {contractFieldName == "contractAddress"
          ? "Contract address"
          : "Resolver contract address"}
      </label>
      <input
        className="input mt-2 !rounded-2xl dark:!bg-zinc-700 dark:!text-white"
        placeholder="0x..."
        {...register(contractFieldName, {
          required: "Contract address is required",
          validate: {
            isAddress: (val) => isAddress(val) || "Invalid address",
          },
        })}
        id="contract_address"
      />
      <ValidationError error={errors.contractAddress?.message} />
      {contractAddress && isAbiError && (
        <ValidationError error="Couldn’t fetch ABI. Please paste ABI manually below." />
      )}

      {isAbiLoading && !isValidationError && (
        <div className="mt-5 h-20 w-full animate-pulse rounded-lg bg-muted/80"></div>
      )}

      {!isValidationError && !isAbiLoading && (
        <>
          {!isCustomAbi && !isAbiError && (
            <div className="mt-3 flex space-x-4 text-sm">
              <span className="text-green-500">✓ ABI Fetched</span>
              <span
                className="cursor-pointer text-muted-foreground underline"
                onClick={() => setIsCustomAbi(true)}
              >
                Switch to custom ABI
              </span>
            </div>
          )}

          {isCustomAbi && (
            <div
              className="mt-3 flex cursor-pointer items-center text-sm text-blue-500"
              onClick={() => {
                if (abi) setValue(abiFieldName, abi)

                setIsCustomAbi(false)
              }}
            >
              <FiChevronLeft />
              <span>Switch back to a fetched ABI</span>
            </div>
          )}
        </>
      )}

      {shouldShowAbiInput && (
        <>
          <div className="mt-5">
            <label className="dark:opacity-70" htmlFor="abi_input">
              ABI
            </label>
            <textarea
              {...register(abiFieldName, {
                required: "ABI is required",
                validate: {
                  isAbi: (value) => isValidAbi(value) || "Invalid Abi",
                },
              })}
              className="input mt-2 h-36 !rounded-2xl dark:!bg-zinc-700 dark:!text-white"
              id="abi_input"
              placeholder='[{"inputs":[{"internalType":"address","name...'
            ></textarea>
          </div>
          <ValidationError error={errors.abi?.message}></ValidationError>
        </>
      )}
    </div>
  )
}
