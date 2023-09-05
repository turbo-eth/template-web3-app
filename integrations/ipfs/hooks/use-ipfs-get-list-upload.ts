import { useQuery } from '@tanstack/react-query'

import { appIpfsGetUploadedList } from '@/integrations/ipfs/routes/get-upload-list/client'

export const useIpfsGetListUploads = () => {
  return useQuery(['list'], async () => appIpfsGetUploadedList())
}
