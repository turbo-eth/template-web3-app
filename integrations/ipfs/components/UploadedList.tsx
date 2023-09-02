'use client'
import { useIpfsGetListUploads } from '../hooks/use-ipfs-get-list-upload'

const UploadedList = () => {
  const { data } = useIpfsGetListUploads()

  return <div>list</div>
}

export default UploadedList
