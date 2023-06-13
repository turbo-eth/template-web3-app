import { useMemo } from 'react'

import { Address as AddressComponent } from '@turbo-eth/core-wagmi'
import { Address } from 'wagmi'

import type { Users } from '@/app/api/app/users/route'

import TableCore from '../shared/table/table-core'
import { TimeFromUtc } from '../shared/time-from-utc'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface AppUsersTableProps {
  data: Users | undefined
  className?: string
}

function AppUsersTable({ data, className }: AppUsersTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: 'Address',
        accessor: 'address',
        Cell: ({ value }: { value: Address }) => <AddressComponent address={value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'Created',
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) => <TimeFromUtc date={value || '0'} />,
      },
      {
        Header: () => null,
        id: 'actions',
        accessor: 'id',
        Cell: () => (
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
  return <TableCore columns={columns} data={data} className={className} />
}

export default AppUsersTable
