import { ReactElement } from 'react'

import classNames from 'classnames'

interface ITablePagination {
  canPreviousPage: Function
  canNextPage: Function
  pageCount: number
  pageIndex: number
  pageSize: number
  pageOptions: Function
  gotoPage: Function
  nextPage: Function
  previousPage: Function
  setPageSize: Function
}

/**
 * @name TablePagination
 * @param {Object} props
 */
export const TablePagination = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  pageOptions,
  pageIndex,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
}: ITablePagination): ReactElement => {
  const styleBase = classNames(
    'pagination flex justify-between items-center bg-white text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 shadow-sm px-3 py-5 rounded-b-lg'
  )

  return (
    <div className={styleBase}>
      <div className="">
        <button className="tag tag-smoke" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className="tag tag-smoke" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button className="tag tag-smoke" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className="tag tag-smoke" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span className="mx-2">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        |
        <span className="bg-card mx-2 inline-block rounded-xl py-3 px-2">
          <span className="p-2">
            Go to page:{' '}
            <input
              className="input ml-3 h-[32px] w-[64px] text-neutral-700 dark:text-neutral-800"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '64px' }}
            />
          </span>
        </span>{' '}
      </div>
      <div className="">
        <select
          className="tag tag-smoke text-xl"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}>
          {[5, 10, 20, 30, 40, 50].map((pageSizeParams) => (
            <option className="text-xl" key={pageSizeParams} value={pageSizeParams}>
              Show {pageSizeParams}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default TablePagination
