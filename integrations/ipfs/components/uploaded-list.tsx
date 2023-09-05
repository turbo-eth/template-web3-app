'use client'

import { useMemo } from 'react'

import TableCore from '@/components/shared/table/table-core'

import { useIpfsGetListUploads } from '../hooks/use-ipfs-get-list-upload'
import { formatDateTime, truncateString } from '../utils'

const UploadedList: React.FC = () => {
  const { data = [] } = useIpfsGetListUploads()

  const columns = useMemo(() => {
    return [
      {
        Header: 'Created at',
        accessor: 'created',
        Cell: ({ value = '' }) => (
          <div className="flex items-center">
            <div className="text-left">{formatDateTime(value)}</div>
          </div>
        ),
      },
      {
        Header: 'Cid',
        accessor: 'cid',
        Cell: ({ value = '' }) => (
          <div className="flex items-center">
            <div className="text-left">
              <a href={`https://${value}.ipfs.w3s.link/`}>{truncateString(value, 20)}</a>
            </div>
          </div>
        ),
      },

      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value = '' }) => (
          <div className="flex items-center">
            <div className="text-left">{truncateString(value, 20)}</div>
          </div>
        ),
      },
    ]
  }, [])

  return <TableCore className="w-full overflow-hidden rounded-xl" columns={columns} data={data} />
}

export default UploadedList
