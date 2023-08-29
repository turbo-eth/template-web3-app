import { ReactElement } from "react"

import { Input } from "@/components/ui/input"

interface ITablePagination {
  canPreviousPage: boolean
  canNextPage: boolean
  pageCount: number
  pageIndex: number
  pageSize: number
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void
  nextPage: () => void
  previousPage: () => void
  setPageSize: (pageSize: number) => void
}

/**
 * @name TablePagination
 * @param {Object} props
 */
export const TablePagination = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
}: ITablePagination): ReactElement => {
  return (
    <div className="flex justify-between items-center bg-background text-foreground shadow-sm px-3 py-5 rounded-b-lg">
      <div className="">
        <button
          className="tag tag-smoke"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="tag tag-smoke"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="tag tag-smoke"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          className="tag tag-smoke"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span className="mx-2">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
        |
        <span className="bg-card mx-2 inline-block rounded-xl py-3 px-2">
          <span className="p-2">
            Go to page:{" "}
            <Input
              className="ml-3 h-[32px] w-[64px]"
              type="number"
              min={1}
              max={pageCount}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: "64px" }}
            />
          </span>
        </span>{" "}
      </div>
      <div className="">
        <select
          className="tag tag-smoke min-w-[90px] bg-background text-xl text-foreground"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSizeParams) => (
            <option
              className="text-xl"
              key={pageSizeParams}
              value={pageSizeParams}
            >
              Show {pageSizeParams}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default TablePagination
