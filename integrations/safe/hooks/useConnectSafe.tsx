'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { OwnerResponse } from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { Address, useAccount } from 'wagmi'

import { BlockExplorerLink } from '@/components/blockchain/block-explorer-link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/lib/hooks/use-toast'

import { Client } from '../safe-client'
import { SafeContext } from '../safe-provider'

const ConnectedSafeContext = createContext({})

export function ConnectSafe({ children }: { children: ReactNode }) {
  const { address } = useAccount()
  const [safeSdk, setSafeSdk] = useState<Safe>()
  const safeClient: Client = useContext(SafeContext) as Client
  const [safeAddress, setSafeAddress] = useState<Address>('0x')
  const { toast, dismiss } = useToast()
  const [ownerSafes, setOwnerSafes] = useState<string[]>()

  useEffect(() => {
    if (safeClient?.service != undefined && address != undefined) {
      safeClient.service
        .getSafesByOwner(address)
        .then((res: OwnerResponse) => {
          setOwnerSafes(res.safes)
        })
        .catch((error) => console.log(error))
    }
  }, [safeClient])

  console.log(safeSdk)

  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }

  const handleConnect = (safeAddress: Address) => {
    Safe.create({ ethAdapter: safeClient.ethAdapter, safeAddress })
      .then((sdk) => {
        setSafeSdk(sdk)
        handleToast({
          title: 'Safe connected',
          description: 'Safe account succesfully connected.',
        })
        setSafeAddress(safeAddress)
      })
      .catch((error) => {
        console.log(error)
        handleToast({
          title: 'An Error Occurred',
          description: 'Error when trying to connect Safe. Try again later.',
        })
      })
  }

  // TODO: handle errors in the form on submit

  return (
    <ConnectedSafeContext.Provider value={{ safeSdk, safeAddress }}>
      <div className="card mb-4 w-full">
        {safeSdk != undefined ? (
          <div className="flex max-w-full flex-wrap items-center justify-between break-words pb-2 pt-5">
            <span className="font-semibold">Connected Safe Address:</span>
            <BlockExplorerLink address={safeAddress} />
            <Button className="btn btn-blue mt-4 w-full" onClick={() => setSafeSdk(undefined)}>
              Disconnect Safe account
            </Button>
          </div>
        ) : (
          <div>
            <p>Select a Safe account address to interact with it.</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="btn btn-blue mt-4 w-full">Connect Safe account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent forceMount align="center">
                {ownerSafes?.map((address) => {
                  return (
                    <DropdownMenuItem key={address} onClick={() => handleConnect(address as Address)}>
                      <span>{address}</span>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      {children}
    </ConnectedSafeContext.Provider>
  )
}

export const useConnectedSafe = (): any => useContext(ConnectedSafeContext)
