import { HTMLAttributes } from 'react'

import classNames from 'clsx'
import { TableBodyProps } from 'react-table'

interface ITableBody extends HTMLAttributes<HTMLElement> {
  page: Array<any>
  prepareRow: any
  props: TableBodyProps
}

/**
 * @name TableBody
 * @param {Object} props
 */
export const TableBody = ({ className, page, prepareRow, ...props }: ITableBody) => {
  const styleCell = classNames(className, 'border-b-2 border-gray-100 dark:border-neutral-700 px-4 py-3')
  return (
    <tbody {...props} className="">
      {page.map((row, idx) => {
        prepareRow(row)
        const styleRow = classNames('row py-3', {
          'bg-gray-100 text-gray-500 dark:text-white': row.original.disabled,
          'bg-white dark:bg-neutral-800 dark:text-white': !row.original.disabled,
        })
        return (
          <tr {...row.getRowProps()} className={styleRow} key={idx}>
            {row.cells.map((cell: any, cIdx: number) => {
              return (
                <td key={cIdx} className={styleCell} {...cell.getCellProps()}>
                  {cell.render('Cell')}
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
