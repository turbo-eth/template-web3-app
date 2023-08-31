import { HTMLAttributes, useMemo } from "react"
import { Address } from "wagmi"

import { Address as AddressComponent } from "@/components/blockchain/address"
import type { Users } from "@/app/api/app/users/route"

import TableCore from "../shared/table/table-core"
import { TimeFromUtc } from "../shared/time-from-utc"
import { Badge } from "../ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface AppUsersTableProps extends HTMLAttributes<HTMLElement> {
  data: Users | undefined
}

function AppUsersTable({ data, className, ...props }: AppUsersTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address",
        Cell: ({ value }: { value: Address }) => (
          <AddressComponent
            truncate
            address={value}
            className="text-sm font-medium"
          />
        ),
      },
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: ({ value }: { value: string }) => (
          <TimeFromUtc date={value || "0"} />
        ),
      },
      {
        Header: () => null,
        id: "actions",
        accessor: "id",
        Cell: () => (
          <div className="flex items-center justify-end gap-2">
            <Popover>
              <PopoverTrigger>
                <Badge variant={"outline"}>Profile</Badge>
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
  return (
    <TableCore className={className} columns={columns} data={data} {...props} />
  )
}

export default AppUsersTable
