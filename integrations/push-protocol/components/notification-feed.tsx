import { chainNameType } from '@pushprotocol/uiweb'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Loadable } from './loadable'
import { Notification } from './notification-item'
import { NotificationFeedProps } from './types'

export function NotificationFeed({ notifications, spamNotifications, notificationsIsLoading, spamNotificationsIsLoading }: NotificationFeedProps) {
  return (
    <Tabs defaultValue="inbox">
      <div className="flex justify-center">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="spam">Spam</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent className="border-none" value="inbox">
        <Loadable isLoading={notificationsIsLoading}>
          {notifications?.length == 0 && <>You currently have no notifications, try subscribing to some channels.</>}
          {notifications?.map((notification, i) => {
            return (
              <Notification
                key={`spam-${i}`}
                app={notification.payload.data.app}
                chainName={notification.source as chainNameType}
                cta={notification.payload.data.acta}
                icon={notification.payload.data.icon}
                image={notification.payload.data.aimg}
                notificationBody={notification.payload.notification.body}
                notificationTitle={notification.payload.notification.title}
                theme={'light'}
                url={notification.payload.data.url}
              />
            )
          })}
        </Loadable>
      </TabsContent>
      <TabsContent className="border-none" value="spam">
        <Loadable isLoading={spamNotificationsIsLoading}>
          {spamNotifications?.length == 0 && <>You currently have no notifications, try subscribing to some channels.</>}
          {spamNotifications?.map((notification, i) => {
            return (
              <Notification
                key={`spam-${i}`}
                app={notification.payload.data.app}
                chainName={notification.source as chainNameType}
                cta={notification.payload.data.acta}
                icon={notification.payload.data.icon}
                image={notification.payload.data.aimg}
                notificationBody={notification.payload.notification.body}
                notificationTitle={notification.payload.notification.title}
                theme={'light'}
                url={notification.payload.data.url}
              />
            )
          })}
        </Loadable>
      </TabsContent>
    </Tabs>
  )
}
