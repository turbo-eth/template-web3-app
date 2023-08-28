import { useState } from "react"
import { ApiNotificationType } from "@pushprotocol/restapi"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { BsBell } from "react-icons/bs"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"

import { ENV } from ".."
import { useNotifications } from "../hooks"
import { NotificationFeed } from "./notification-feed"

export type NotificationBellProps = {
  env: ENV
  mockedNotifications?: ApiNotificationType[]
}

export function NotificationBell(props: NotificationBellProps) {
  const [read, setRead] = useState(false)

  const { env, mockedNotifications } = props
  const { address } = useAccount()

  const { data: notifications, isLoading: notificationsIsLoading } =
    useNotifications({
      user: address as string,
      env: env,
      spam: false,
    })

  const { data: spamNotifications, isLoading: spamIsLoading } =
    useNotifications({
      user: address as string,
      env: env,
      spam: true,
    })

  const allNotifications = [
    ...(notifications || []),
    ...(mockedNotifications || []),
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" onClick={() => setRead(true)}>
          <BsBell size={30} />
          {allNotifications.length > 0 && !read && (
            <div className="absolute right-2 top-2 h-5 w-5 rounded-full bg-red-500">
              {allNotifications.length}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        avoidCollisions={false}
        className="card w-screen max-w-md !px-4 !shadow-lg !shadow-black/40"
        side="bottom"
      >
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
