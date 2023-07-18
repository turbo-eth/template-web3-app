import { NotificationItemProps } from '@pushprotocol/uiweb'
import Image from 'next/image'
import { BsGlobe } from 'react-icons/bs'

import { strLimit } from '../utils/helpers'

export function NotificationItem({ url, notificationTitle, notificationBody, image }: NotificationItemProps) {
  const handleOpen = () => {
    if (!url) return
    window.open(url)
  }

  return (
    <div className="flex cursor-pointer flex-col space-y-2 rounded-lg p-3 duration-200 hover:bg-slate-200/10" onClick={() => handleOpen()}>
      <div className="text-lg font-bold">{notificationTitle}</div>
      <div>{notificationBody}</div>
      <div className="relative h-48">
        {image && (
          <Image alt={notificationTitle || ''} className="rounded" fill={true} loader={() => image} src={image} style={{ objectFit: 'cover' }} />
        )}
      </div>
      {url && (
        <div className="flex space-x-1">
          <BsGlobe />
          <div className="text-sm">{strLimit(url, 50)}</div>
        </div>
      )}
    </div>
  )
}
