import { useState } from 'react'

import { ApiNotificationType } from '@pushprotocol/restapi'
import { BsBell } from 'react-icons/bs'
import { useAccount } from 'wagmi'

import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'

import { NotificationFeed } from './notification-feed'
import { ENV } from '..'
import { useNotifications } from '../hooks'

export type NotificationBellProps = {
  env: ENV
  mockedNotifications?: ApiNotificationType[]
}

export function NotificationBell(props: NotificationBellProps) {
  const [read, setRead] = useState(false)

  const { env, mockedNotifications } = props
  const { address } = useAccount()

  const { data: notifications, isLoading: notificationsIsLoading } = useNotifications({
    user: address as string,
    env: env,
    spam: false,
  })

  const { data: spamNotifications, isLoading: spamIsLoading } = useNotifications({
    user: address as string,
    env: env,
    spam: true,
  })

  const allNotifications = [...(notifications || []), ...(mockedNotifications || [])]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="btn btn-primary relative" onClick={() => setRead(true)}>
          <BsBell size={30} />
          {allNotifications.length > 0 && !read && (
            <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-red-500">{allNotifications.length}</div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent avoidCollisions={false} className="card w-screen max-w-md !px-4 !shadow-lg !shadow-black/40" side="bottom">
        <div>
          <NotificationFeed
            notifications={allNotifications}
            notificationsIsLoading={notificationsIsLoading}
            spamNotifications={spamNotifications}
            spamNotificationsIsLoading={spamIsLoading}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
