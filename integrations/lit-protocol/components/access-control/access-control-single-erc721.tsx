import { useState } from "react"
import { useForm } from "react-hook-form"
import { isAddress } from "viem"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { supportedChains } from "../../utils/config"
import { AccessControlProps } from "./types"

interface FormSchema {
  address: string
  tokenId: string
  chain: string
}

export function AccessControlSingleERC721({
  setAccessControlConditions,
}: AccessControlProps) {
  const [address, setAddress] = useState<string>("")
  const [tokenId, setTokenId] = useState<number>()
  const [chain, setChain] = useState<string>("ethereum")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>()

  const onSubmit = (data: FormSchema) => {
    setAccessControlConditions(
      getAccessControlConditions(chain, data.address, data.tokenId)
    )
  }

  return (
    <div>
      <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Chain:</label>
          <Select
            {...register("chain")}
            value={chain}
            onValueChange={(value) => setChain(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a chain" />
            </SelectTrigger>
            <SelectContent>
              {supportedChains.map((chain) => (
                <SelectItem key={chain} value={chain}>
                  {chain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          <label>ERC721 Contract Address:</label>
          <input
            className="input mt-4"
            {...register("address", {
              required: "Contract address is required",
              validate: {
                isValidEthereumAddress: (value) =>
                  isAddress(value) || "Invalid Contract address",
              },
            })}
            placeholder="0x1234567890123456789012345678901234567890"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.address?.message)}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label>Token ID:</label>
          <input
            className="input mt-4"
            min={0}
            placeholder="0"
            type="number"
            {...register("tokenId", {
              required: "Token ID is required",
            })}
            value={tokenId}
            onChange={(e) => {
              console.log(e.target.value)
              setTokenId(Number(e.target.value))
            }}
          />
          {errors.tokenId && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.tokenId?.message)}
            </p>
          )}
        </div>
        <Button variant="emerald" className="mt-4" type="submit">
          Save
        </Button>
      </form>
    </div>
  )
}

const getAccessControlConditions = (
  chain: string,
  address: string,
  tokenId: string
) => {
  return [
    {
      conditionType: "evmBasic",
      contractAddress: address,
      standardContractType: "ERC721",
      chain,
      method: "ownerOf",
      parameters: [tokenId],
      returnValueTest: {
        comparator: "=",
        value: ":userAddress",
      },
    },
  ]
}
