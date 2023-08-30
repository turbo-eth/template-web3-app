import { HTMLAttributes } from "react"
import type { Address } from "wagmi"

import { useUser } from "@/lib/hooks/use-user"
import { cn } from "@/lib/utils"
import { LinkComponent } from "@/components/shared/link-component"
import { useDiscoGetProfileFromAddress } from "@/integrations/disco/hooks/use-disco-get-profile-from-address"

import { DISCO_APP_URL } from "../utils/constants"
import { Credential } from "../utils/types"

interface DiscoProfileCredentialsProps extends HTMLAttributes<HTMLDivElement> {
  address?: Address
}

export const DiscoProfileCredentials = ({
  className,
  address,
  ...props
}: DiscoProfileCredentialsProps) => {
  const { user } = useUser()
  const { data, isLoading, isError, error } = useDiscoGetProfileFromAddress(
    address,
    user
  )

  if (isError)
    return (
      <div className={cn("font-medium text-red-500", className)}>
        {error instanceof Error ? error.message : String(error)}
      </div>
    )

  return (
    <div
      className={cn(
        "mt-10 grid grid-cols-1 items-center justify-center gap-3 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      {isLoading
        ? Array.from({ length: 6 }, (_, index) => (
            <CredentialCardSkeleton key={index} />
          ))
        : data?.creds?.map((credential: Credential) => (
            <LinkComponent
              key={credential.id}
              className="card flex h-[224px] flex-col justify-between transition duration-300 hover:scale-105 dark:bg-neutral-500/80"
              href={`${DISCO_APP_URL}/${credential.id}`}
            >
              <div className="break-words font-bold text-neutral-900 dark:text-neutral-100">{`${
                credential?.type[1] || credential?.type[0]
              }`}</div>
              <div>
                <hr className="my-2" />
                <ul className="flex flex-wrap gap-2">
                  {credential?.type?.map((type, idx) => {
                    return (
                      <li
                        key={idx}
                        className="overflow-x-auto break-words text-xs font-bold"
                      >
                        {type}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </LinkComponent>
          ))}
    </div>
  )
}

function CredentialCardSkeleton() {
  return (
    <div className="h-56 w-[600px] max-w-full animate-pulse rounded-lg bg-gray-500/80 dark:bg-gray-200"></div>
  )
}
