import { HTMLAttributes } from 'react'

import Image from 'next/image'
import { LuExternalLink } from 'react-icons/lu'
import ReactMarkdown from 'react-markdown'
import type { Address } from 'wagmi'

import { LinkComponent } from '@/components/shared/link-component'
import { useUser } from '@/lib/hooks/use-user'
import { cn } from '@/lib/utils'

import { useDiscoGetProfileFromAddress } from '../hooks/use-disco-get-profile-from-address'
import { DISCO_APP_URL } from '../utils/constants'

interface DiscoProfileBasicProps extends HTMLAttributes<HTMLDivElement> {
  address?: Address
}

export const DiscoProfileBasic = ({ className, address, ...props }: DiscoProfileBasicProps) => {
  const { user } = useUser()
  const { data, isLoading, isError, error } = useDiscoGetProfileFromAddress(address, user)

  if (isError) return <div className={cn('text-red-500 font-medium', className)}>{error instanceof Error ? error.message : String(error)}</div>

  return (
    <div className={cn('grid grid-cols-1 items-center justify-between gap-2 lg:grid-cols-4', className)} {...props}>
      <div className="col-span-1">
        {isLoading ? (
          <div className="h-60 w-60 max-w-full animate-pulse rounded-lg border-4 bg-gray-500/80 shadow-xl dark:bg-gray-200" />
        ) : (
          <Image
            alt="Profile Avatar"
            className="mx-auto max-w-full rounded-lg border-4 shadow-xl lg:ml-0"
            height={240}
            loader={() => data?.profile?.avatar}
            src={data?.profile?.avatar}
            width={240}
          />
        )}
      </div>
      <div className="col-span-1 lg:col-span-3">
        {isLoading ? (
          <div className="mx-auto h-60 w-[800px] max-w-full animate-pulse rounded-lg bg-gray-500/80 shadow-xl dark:bg-gray-200 lg:w-full" />
        ) : (
          <div className="max-w-full">
            {data?.profile?.name && (
              <div className="text-3xl font-bold text-neutral-900 dark:text-white">{data?.linkages && data?.linkages?.[data?.profile?.name]?.id}</div>
            )}
            {data?.did && (
              <LinkComponent href={`${DISCO_APP_URL}/${data?.did}`}>
                <div className="flex max-w-full items-center text-xl font-medium text-neutral-600 transition-colors hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-300">
                  <span className="overflow-x-auto break-words">{data?.did}</span> <LuExternalLink className="ml-2" size="20" />
                </div>
              </LinkComponent>
            )}
            {data?.profile?.bio && (
              <div className="mt-10 text-neutral-900 dark:text-white">
                <ReactMarkdown
                  components={{
                    a: ({ ...props }: HTMLAttributes<HTMLElement>) => (
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        {...props}
                        className="font-medium text-gray-800 underline transition-colors dark:text-blue-200"
                      />
                    ),

                    code: ({ ...props }: HTMLAttributes<HTMLElement>) => (
                      <code {...props} className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800" />
                    ),
                  }}>
                  {data?.profile?.bio}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
