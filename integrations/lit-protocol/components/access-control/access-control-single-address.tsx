import { useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { isAddress } from "viem"

import { Button } from "@/components/ui/button"

import { AccessControlProps } from "./types"

interface FormSchema {
  address: string
}

export function AccessControlSingleAddress({
  setAccessControlConditions,
}: AccessControlProps) {
  const [address, setAddress] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const onSubmit = (data: FormSchema) => {
    setAccessControlConditions(getAccessControlConditions(data.address))
  }

  return (
    <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label className="mt-4">Wallet Address:</label>
      <input
        className="input mt-4"
        {...register("address", {
          required: "Ethereum address is required",
          validate: {
            isValidEthereumAddress: (value) =>
              isAddress(value) || "Invalid Ethereum address",
          },
        })}
        placeholder="0x1234567890123456789012345678901234567890"
        type="text"
        value={address}
        onChange={handleChange}
      />
      {errors.address && (
        <p className="mt-1 text-sm text-red-500">
          {String(errors.address?.message)}
        </p>
      )}
      <Button variant="emerald" className="mt-4" type="submit">
        Save
      </Button>
    </form>
  )
}

const getAccessControlConditions = (address: string) => {
  return [
    {
      conditionType: "evmBasic",
      contractAddress: "",
      standardContractType: "",
      chain: "ethereum",
      method: "",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: "=",
        value: address,
      },
    },
  ]
}
