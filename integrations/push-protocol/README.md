# Push Protocol - TurboETH Integration

[Push Protocol](https://push.org/) is a web3 communication network, enabling cross-chain notifications and messaging for dapps, wallets, and services.

This integrations provides useful hooks and components from main Push Protocol features.

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
Renders simple card with channel information and interactive subscribe button

`Chat`
Renders native Push Protocol support chat window on bottom-right corner of the screen


---

## Hooks
This integration has two types of hooks for accessing and modifying data on PUSH. We can split them as query and action hooks. 
They have standard rule of implementation, for example:

Retrieve channel data hook.
```tsx
const { data, isLoading, error, refetch } = useNotifications({
  user: address as string,
  env: ENV.STAGING,
  spam: false,
})
```

Subscribe to a channel hook
```tsx
const { data, isLoading, error, action: subscribe } = useSubscribeOrUnsubscribeToChannel({ action: 'subscribe' })
```


### Hooks for retrieving data

`useChannel` : Returns Push channel based on parameters

`useSearchChannels` : Returns Push channel based on search parameters

`useNotifications` : Returns Push notifications based on parameters

`useChats` : Returns chats based on parameters

`useUserSubscriptions` : Returns user channel subscriptions based on parameters

### Action Hooks

`useSendNotifications` : Returns Push notifications based on parameters

`useSubscribeOrUnsubscribeToChannel` : Returns Push notifications based on parameters

`createUser` : Returns Push channel based on parameters

### Lazy hooks

Additionally, if you don't want to depend on state variables returned from the hooks above, you may add `Lazy` at the end of any hook, and it'll return fresh function for fetching the resource. For Example:

```tsx
const [getChannel] = useChannelLazy();
getChannel({...args}).then().catch() //
```

## File Structure

```
integrations/push
├── components
│   ├── channel-card.tsx
│   ├── chat.tsx
│   ├── index.ts
│   ├── loadable.tsx
│   ├── notification-feed.tsx
│   ├── notification-item.tsx
│   └── types.ts
├── hooks
│   ├── index.ts
│   ├── use-channel.ts
│   ├── use-chats.ts
│   ├── use-create-user.ts
│   ├── use-notifications.ts
│   ├── use-push-action.ts
│   ├── use-push-query.ts
│   ├── use-search-channels.ts
│   ├── use-send-notifications.ts
│   ├── use-subscribe-channel.ts
│   └── use-user-subscriptions.ts
├── index.ts
├── README.md
└── utils
    └── types.ts