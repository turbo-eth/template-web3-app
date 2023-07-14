import { useState } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { BsBell } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import { useAccount } from 'wagmi'

import { NotificationFeed } from './notification-feed'
import { NotificationBellProps } from './types'
import { useNotifications } from '../hooks'

export function NotificationBell(props: NotificationBellProps) {
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

  const [read, setRead] = useState(false)

  const allNotifications = [...(notifications || []), ...(mockedNotifications || [])]

  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button aria-label="Update dimensions" className="btn btn-primary relative" onClick={() => setRead(true)}>
            <BsBell size={30} />
            {allNotifications.length > 0 && !read && (
              <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-red-500">{allNotifications.length}</div>
            )}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content avoidCollisions={false} className="card w-screen max-w-md !px-2 !shadow-lg !shadow-black/40" side="bottom">
            <div>
              <NotificationFeed
                notifications={allNotifications}
                notificationsIsLoading={notificationsIsLoading}
                spamNotifications={spamNotifications}
                spamNotificationsIsLoading={spamIsLoading}
              />
            </div>
            <Popover.Close aria-label="Close" className="absolute top-2 right-2">
              <IoIosClose />
            </Popover.Close>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}
