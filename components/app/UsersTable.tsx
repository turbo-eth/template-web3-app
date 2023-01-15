import React from 'react'

import { Address } from '@turbo-eth/core-wagmi'
import Link from 'next/link'

import TableCore from '../table/TableCore'
import TimeFromEpoch from '../time/TimeFromEpoch'

function UsersTable({ data, className }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Address',
        accessor: 'address',
        Cell: (props: any) => <Address address={props.value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'Created',
        accessor: 'createdAt',
        Cell: (props: any) => <TimeFromEpoch epoch={props.value || 0} />,
      },
      {
        Header: () => null,
        id: 'actions',
        accessor: 'id',
        Cell: (props: any) => (
          <div className="flex items-center justify-end gap-2">
            <Link href={`/admin/user/${props.value}`}>
              <span className="tag tag-white text-xs">View</span>
            </Link>
          </div>
        ),
      },
    ],
    []
  )
  if (!data) return null
  return <TableCore columns={columns} data={data} className={className} />
}

export default UsersTable
