# Push Protocol - TurboETH Integration

[Push Protocol](https://push.org/) is a web3 communication network, enabling cross-chain notifications and messaging for dapps, wallets, and services.

This integration provides useful hooks and components from the main Push Protocol features.

## Features

- Feeds/Notifications (Retrieve, Send)
- Channels (Retrieve, Search)
- Subscriptions (Retrieve, Subscribe/Unsubscribe)
- Chats

---

## Components

`NotificationFeed`
Renders inbox and spam notifications

`NotificationItem`
Renders single notification item

`ChannelCard`
Renders simple card with channel information and an interactive subscribe button

`ChannelSearch`
Renders channel search inputs along channel cards for search results

`Chat`
Renders native Push Protocol support chat window on the bottom-right corner of the screen

---

## Hooks

These hooks are just push protocol-specific wrappers for `react-query`. So it utilizes all the features `react-query` has.

```tsx
const { data, isLoading, error, refetch } = useNotifications({
  user: address as string,
  env: ENV.STAGING,
  spam: false,
})
```

Subscribe to a channel hook

```tsx
const { data, isLoading, error, mutateAsync: subscribe } = useSubscribe()
```

Send notification hook

```tsx
const { data, isLoading, error, mutateAsync: sendNotification } = useSendNotification()

await sendNotification({..args})
```

### Query Hooks

`useChannel` : Returns Push channel based on parameters

`useSearchChannels` : Returns Push channel based on search parameters

`useNotifications` : Returns Push notifications based on parameters

`useChats` : Returns chats based on parameters

`useUserSubscriptions` : Returns user channel subscriptions based on parameters

### Mutation Hooks

`useSendNotifications` : Returns mutation for sending notifications

`useSubscribe` : Returns mutation for subscribe action

`useUnsubscribe` : Returns mutation for unsubscribe action

`useCreateUser` : Returns mutation for creating user

## File Structure

```
integrations/push
├── components
│   ├── channel-card.tsx
│   ├── channel-search.tsx
│   ├── chat.tsx
│   ├── index.ts
│   ├── loadable.tsx
│   ├── notification-bell.tsx
│   ├── notification-feed.tsx
│   ├── notification-item.tsx
│   └── subscribe-button.tsx
├── hooks
│   ├── index.ts
│   ├── use-channel.ts
│   ├── use-chats.ts
│   ├── use-create-user.ts
│   ├── use-notifications.ts
│   ├── use-search-channels.ts
│   ├── use-send-notifications.ts
│   ├── use-subscribe-channel.ts
│   ├── use-unsubscribe-channel.ts
│   └── use-user-subscriptions.ts
└── utils
    ├── constants.ts
    ├── helpers.ts
    └── types.ts
├── index.ts
└── README.md
```
