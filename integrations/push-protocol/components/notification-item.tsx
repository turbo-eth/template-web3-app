import { NotificationItemProps } from '@pushprotocol/uiweb'
import { BsGlobe } from 'react-icons/bs'

import { strLimit } from '../utils/helpers'

export function Notification(props: NotificationItemProps) {
  const handleOpen = () => {
    if (!props.url) return
    window.open(props.url)
  }

  return (
    <div className="flex cursor-pointer flex-col space-y-2 rounded-lg p-3 duration-200 hover:bg-slate-200/10" onClick={() => handleOpen()}>
      <div className="text-lg font-bold">{props.notificationTitle}</div>
      <div>{props.notificationBody}</div>
      {props.image && <img alt={props.notificationTitle} className="rounded" src={props.image} />}
      {props.url && (
        <div className="flex space-x-1">
          <BsGlobe />
          <div className="text-sm">{strLimit(props.url, 50)}</div>
        </div>
      )}
    </div>
  )
}
