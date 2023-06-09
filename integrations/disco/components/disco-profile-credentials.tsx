import * as React from 'react'

import classNames from 'clsx'
import type { Address } from 'wagmi'

import { useDiscoGetProfileFromAddress } from '@/integrations/disco/hooks/use-disco-get-profile-from-address'
import { useUser } from '@/lib/hooks/use-user'

interface DiscoProfileCredentialsProps {
  className?: string
  address?: Address
}

export const DiscoProfileCredentials = ({ className, address }: DiscoProfileCredentialsProps) => {
  const { user } = useUser()
  const { data, isLoading, isError } = useDiscoGetProfileFromAddress(address, user)
  const classes = classNames(className, 'DiscoProfileCredentials')

  if (isLoading) return <div className={classes}>Loading...</div>
  if (isError) return <div className={classes}>No profile found. </div>
  return (
    <div className={classes}>
      <div className="container mt-10 grid grid-cols-12 gap-10">
        {data?.creds?.map((credential: any) => {
          return (
            <div key={credential.id} className="card bg-gradient-credential col-span-12 lg:col-span-4">
              <div className=" break-words font-bold text-neutral-900 dark:text-neutral-100">{`${credential?.type[1] || credential?.type[0]}`}</div>
              <div className="mt-32">
                <hr className="my-2" />
                <ul className="flex flex-wrap gap-2">
                  {credential?.type?.map((type: any, idx: number) => {
                    return (
                      <li key={idx} className="text-xs font-bold">
                        {type}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
