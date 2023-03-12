import React from 'react'

import { Address } from '@turbo-eth/core-wagmi'
import Link from 'next/link'

import TableCore from '../shared/table/table-core'
import { TimeFromUtc } from '../shared/time-from-utc'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

function AppUsersTable({ data, className }: any) {
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
        Cell: (props: any) => <TimeFromUtc date={props.value || 0} />,
      },
      {
        Header: () => null,
        id: 'actions',
        accessor: 'id',
        Cell: (props: any) => (
          <div className="flex items-center justify-end gap-2">
            <Popover>
              <PopoverTrigger>
                <span className="tag tag-white text-xs">Profile</span>
              </PopoverTrigger>
              <PopoverContent>Add user profile information 🥳</PopoverContent>
            </Popover>
          </div>
        ),
      },
    ],
    []
  )
  if (!data) return null
  console.log(data)
  return <TableCore columns={columns} data={data} className={className} />
}

export default AppUsersTable
