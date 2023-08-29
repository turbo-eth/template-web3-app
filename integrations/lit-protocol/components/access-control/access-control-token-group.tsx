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
  chain: string
  tokenType: string
  address: string
  tokenAmount: string
  tokenId: string
  tokenDecimals: string
}

export function AccessControlTokenGroup({
  setAccessControlConditions,
}: AccessControlProps) {
  const [address, setAddress] = useState<string>("")
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenType, setTokenType] = useState<string>()
  const [tokenDecimals, setTokenDecimals] = useState<number>(18)
  const [tokenId, setTokenId] = useState<number>(0)
  const [chain, setChain] = useState<string>("ethereum")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>()

  const onSubmit = ({ address, tokenId, tokenAmount }: FormSchema) => {
    setAccessControlConditions(
      getAccessControlConditions(
        chain,
        address,
        tokenType || "",
        tokenAmount,
        tokenId,
        tokenDecimals
      )
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
          <label>Token Type:</label>
          <Select
            {...register("tokenType", {
              validate: {
                isValidEthereumAddress: () =>
                  !!tokenType || "Token type is required",
              },
            })}
            value={tokenType}
            onValueChange={(value) => setTokenType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a token type" />
            </SelectTrigger>
            <SelectConten>
              <SelectItem value="ERC20">ERC20</SelectItem>
              <SelectItem value="ERC721">ERC721</SelectItem>
              <SelectItem value="ERC1155">ERC1155</SelectItem>
            </SelectConten>
          </Select>
          {errors.tokenType && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.tokenType?.message)}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label>Contract Address:</label>
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
          <label>Token Amount:</label>
          <input
            className="input mt-4"
            type="number"
            {...register("tokenAmount", {
              required: "Token amount is required",
              validate: (value) =>
                Number(value) > 0 || "Token amount must be greater than 0",
            })}
            value={tokenAmount}
            onChange={(e) => {
              console.log(e.target.value)
              setTokenAmount(Number(e.target.value))
            }}
          />
          {errors.tokenAmount && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.tokenAmount?.message)}
            </p>
          )}
        </div>
        {tokenType === "ERC1155" && (
          <div className="mt-4">
            <label>Token ID:</label>
            <input
              className="input mt-4"
              type="number"
              {...register("tokenId", {
                required: "Token ID is required",
                validate: (value) =>
                  Number(value) >= 0 || "Token ID must be positive",
              })}
              value={tokenId}
              onChange={(e) => {
                setTokenId(Math.floor(Number(e.target.value)))
              }}
            />
            {errors.tokenId && (
              <p className="mt-1 text-sm text-red-500">
                {String(errors.tokenId?.message)}
              </p>
            )}
          </div>
        )}
        {tokenType === "ERC20" && (
          <div className="mt-4">
            <label>ERC20 Decimals:</label>
            <input
              className="input mt-4"
              type="number"
              {...register("tokenDecimals", {
                required: "ERC20 Decimals is required",
                validate: (value) =>
                  Number(value) > 0 || "Token decimals must be positive",
              })}
              value={tokenDecimals}
              onChange={(e) => {
                setTokenDecimals(Math.floor(Number(e.target.value)))
              }}
            />
            {errors.tokenDecimals && (
              <p className="mt-1 text-sm text-red-500">
                {String(errors.tokenDecimals?.message)}
              </p>
            )}
          </div>
        )}
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
  tokenType: string,
  tokenAmount: string,
  tokenId: string,
  tokenDecimals: number
) => {
  return [
    {
      conditionType: "evmBasic",
      contractAddress: address,
      standardContractType: tokenType,
      chain,
      method: "balanceOf",
      parameters:
        tokenType === "ERC1155" ? [":userAddress", tokenId] : [":userAddress"],
      returnValueTest: {
        comparator: ">=",
        value:
          tokenType === "ERC20"
            ? String(Number(tokenAmount) * 10 ** tokenDecimals)
            : tokenAmount,
      },
    },
  ]
}
