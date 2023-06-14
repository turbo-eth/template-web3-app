import { HTMLAttributes } from 'react'

import ReactMarkdown from 'react-markdown'
import type { Address } from 'wagmi'

import { useDiscoGetProfileFromAddress } from '@/integrations/disco/hooks/use-disco-get-profile-from-address'
import { useUser } from '@/lib/hooks/use-user'

interface DiscoProfileBasicProps extends HTMLAttributes<HTMLDivElement> {
  address?: Address
}

export const DiscoProfileBasic = ({ className, address, ...props }: DiscoProfileBasicProps) => {
  const { user } = useUser()
  const { data, isLoading, isError, error } = useDiscoGetProfileFromAddress(address, user)
  if (isLoading) return <div className={className}>Loading...</div>
  if (isError) return <div className={className}>{error instanceof Error ? error.message : String(error)}</div>

  return (
    <div className={className} {...props}>
      <div className="flex gap-2">
        <div className="w-full max-w-[320px]">
          <img src={data?.profile?.avatar} className="h-auto w-64 rounded-lg border-4 shadow-xl" alt="Profile Avatar" />
        </div>
        <div className="col-span-8">
          {data?.profile?.name && (
            <div className="text-3xl font-bold text-neutral-900 dark:text-white">{data?.linkages && data?.linkages?.[data?.profile?.name]?.id}</div>
          )}
          {data?.did && <div className="text-xl font-medium text-neutral-600 dark:text-neutral-400">{data?.did}</div>}
          {data?.profile?.bio && (
            <div className="mt-10 text-neutral-900 dark:text-white">
              <ReactMarkdown
                components={{
                  a: ({ ...props }: HTMLAttributes<HTMLElement>) => (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
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
      </div>
    </div>
  )
}
