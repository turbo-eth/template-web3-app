import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { isAddress } from 'viem'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

import { AccessControlProps } from './types'
import { supportedChains } from '../../utils/config'

export function AccessControlSingleERC721({ setAccessControlConditions }: AccessControlProps) {
  const [address, setAddress] = useState<string>('')
  const [tokenId, setTokenId] = useState<number>()
  const [chain, setChain] = useState<string>('ethereum')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    setAccessControlConditions(getAccessControlConditions(chain, data.address, data.tokenId))
  }

  return (
    <div>
      <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Chain:</label>
          <Select {...register('chain')} value={chain} onValueChange={(value) => setChain(value)}>
            <SelectTrigger className="input mt-4 text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400">
              <SelectValue placeholder="Select a chain" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-white">
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
            {...register('address', {
              required: 'Contract address is required',
              validate: {
                isValidEthereumAddress: (value) => isAddress(value) || 'Invalid Contract address',
              },
            })}
            placeholder="0x1234567890123456789012345678901234567890"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{String(errors.address?.message)}</p>}
        </div>
        <div className="mt-4">
          <label>Token ID:</label>
          <input
            className="input mt-4"
            type="number"
            placeholder="0"
            min={0}
            {...register('tokenId', {
              required: 'Token ID is required',
            })}
            value={tokenId}
            onChange={(e) => {
              console.log(e.target.value)
              setTokenId(Number(e.target.value))
            }}
          />
          {errors.tokenId && <p className="mt-1 text-sm text-red-500">{String(errors.tokenId?.message)}</p>}
        </div>
        <button className="btn btn-emerald mt-4" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

const getAccessControlConditions = (chain: string, address: string, tokenId: string) => {
  return [
    {
      conditionType: 'evmBasic',
      contractAddress: address,
      standardContractType: 'ERC721',
      chain,
      method: 'ownerOf',
      parameters: [tokenId],
      returnValueTest: {
        comparator: '=',
        value: ':userAddress',
      },
    },
  ]
}
