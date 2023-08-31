import { HTMLAttributes } from "react"
import { TableBodyProps } from "react-table"

import { cn } from "@/lib/utils"

interface ITableBody extends HTMLAttributes<HTMLElement> {
  page: Array<any>
  prepareRow: any
  props: TableBodyProps
}

/**
 * @name TableBody
 * @param {Object} props
 */
export const TableBody = ({
  className,
  page,
  prepareRow,
  ...props
}: ITableBody) => {
  const styleCell = cn(
    className,
    "border-b-2 border-gray-100 dark:border-neutral-700 px-4 py-3"
  )
  return (
    <tbody {...props}>
      {page.map((row, idx) => {
        prepareRow(row)
        const styleRow = cn("row py-3", {
          "bg-card text-muted-foreground": row.original.disabled,
          "bg-card": !row.original.disabled,
        })
        return (
          <tr {...row.getRowProps()} className={styleRow} key={idx}>
            {row.cells.map((cell: any, cIdx: number) => {
              return (
                <td key={cIdx} className={styleCell} {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
export default TableBody
