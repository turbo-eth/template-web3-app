import { NotificationItem } from '@pushprotocol/uiweb'

// throws deprecated error otherwise. @@pushprotocol/uiweb is using deprecated defaultProps.
delete NotificationItem.defaultProps

export const Notification = NotificationItem
