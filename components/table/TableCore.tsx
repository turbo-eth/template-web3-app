// @ts-nocheck
import React from 'react'

import { TableInstance, useExpanded, usePagination, useSortBy, useTable } from 'react-table'

import TableBody from './TableBody'
import TableHead from './TableHead'
import TablePagination from './TablePagination'

interface TableProps {
  className?: string
  data: Array<any>
  columns: Array<any>
  rowExpanded?: any
}

interface TableInstanceProps extends TableInstance<object> {
  page?: number
  canPreviousPage?: boolean
  canNextPage?: boolean
  pageCount?: number
  gotoPage?: Function
  nextPage?: Function
  previousPage?: Function
  setPageSize?: Function
  pageSize?: number
  pageOptions?: Array<number>
  state: any
}

export function TableCore({ className, columns, data, rowExpanded }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  }: TableInstanceProps = useTable(
    {
      columns,
      data,
      initialState: {},
    },
    useSortBy,
    useExpanded,
    usePagination
  )

  // Render the UI for your table
  return (
    <div className={className}>
      <table className="w-full overflow-hidden " {...getTableProps()}>
        <TableHead defaultStyle headerGroups={headerGroups} className=" bg-white text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100" />
        <TableBody
          // className="text-neutral-700"
          page={page}
          prepareRow={prepareRow}
          props={getTableBodyProps()}
          rowExpanded={rowExpanded}
        />
      </table>
      <TablePagination
        pageSize={pageSize}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
      />
    </div>
  )
}

export default TableCore
