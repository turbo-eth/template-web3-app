import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Signer, ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'
import { z } from 'zod'

import { useTokenStorage } from './use-token-storage'
import { erc20MintableByteCode } from '../abis/erc20-mintable-bytecode'
import { erc20MintableABI } from '../erc20-wagmi'

export const useDeploy = ({ deployFormSchema }) => {
  const [, setContractAddress] = useState<string | undefined>()
  const [token, setToken] = useTokenStorage()
  const { data: signer } = useSigner()

  const form = useForm<z.infer<typeof deployFormSchema>>({
    resolver: zodResolver(deployFormSchema),
    defaultValues: {
      name: '',
      symbol: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof deployFormSchema>) => {
    const factory = new ethers.ContractFactory(erc20MintableABI, erc20MintableByteCode, signer as Signer)
    const contract = await factory.deploy(values?.name, values?.symbol)
    const deployed = await contract.deployTransaction.wait()

    form.reset()
    setToken(deployed.contractAddress)
    setContractAddress(deployed.contractAddress)
  }

  return { form, onSubmit, token }
}
