import { ChatProps, Chat as PushChat } from '@pushprotocol/uiweb'

export function Chat(props: ChatProps) {
  return <PushChat {...props}></PushChat>
}
