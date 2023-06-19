import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface ITableHead extends HTMLAttributes<HTMLTableSectionElement> {
  headerGroups: any
  defaultStyle: boolean
}

export const TableHead = ({ className, headerGroups, defaultStyle, ...props }: ITableHead) => {
  const styleBase = cn(className, {
    'rounded-xl shadow-sm border-b-2 border-blue-300 pb-5 h-20 z-10': defaultStyle,
  })
  return (
    <thead className={styleBase} {...props}>
      {headerGroups.map((headerGroup: any, ihg: any) => (
        <tr key={ihg} className="mt-3" {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any, idx: number) => (
            <th key={idx} className="mt-3 px-3 text-left" {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render('Header')}
              <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}
export default TableHead
