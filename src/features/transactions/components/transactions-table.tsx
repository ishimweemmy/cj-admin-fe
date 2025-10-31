import { useState } from 'react'
import {
  type ColumnFilter,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ETransactionType, ETransactionStatus } from '@/enums/financial.enum'
import type { TTransactionAdmin } from '../server/index.dto'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { transactionsColumns as columns } from './transactions-columns'

type TransactionsTableProps = {
  data: TTransactionAdmin[]
  isLoading?: boolean
  showToolbar?: boolean
  showPagination?: boolean
  hideColumns?: string[]
}

const transactionTypes = Object.values(ETransactionType).map((type) => ({
  label: type.replace(/_/g, ' '),
  value: type,
}))

const transactionStatuses = Object.values(ETransactionStatus).map((status) => ({
  label: status,
  value: status,
}))

export function TransactionsTable({
  data,
  isLoading,
  showToolbar = true,
  showPagination = true,
  hideColumns = [],
}: TransactionsTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ])

  const initialColumnVisibility: VisibilityState = {}
  hideColumns.forEach((col) => {
    initialColumnVisibility[col] = false
  })

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const reference = String(
        row.getValue('transactionReference')
      ).toLowerCase()
      const description = String(row.getValue('description')).toLowerCase()
      const customerName = String(row.getValue('customerName')).toLowerCase()
      const customerEmail = String(row.original.customerEmail).toLowerCase()
      const searchValue = String(filterValue).toLowerCase()

      return (
        reference.includes(searchValue) ||
        description.includes(searchValue) ||
        customerName.includes(searchValue) ||
        customerEmail.includes(searchValue)
      )
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='flex flex-1 flex-col gap-4'>
      {showToolbar && (
        <DataTableToolbar
          table={table}
          searchPlaceholder='Search by customer, reference, or description...'
          filters={[
            {
              columnId: 'type',
              title: 'Type',
              options: transactionTypes,
            },
            {
              columnId: 'status',
              title: 'Status',
              options: transactionStatuses,
            },
          ]}
        />
      )}
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      header.column.columnDef.meta?.className,
                      header.column.columnDef.meta?.thClassName
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.columnDef.meta?.className,
                        cell.column.columnDef.meta?.tdClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {isLoading ? 'Loading...' : 'No transactions found.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && <DataTablePagination table={table} />}
    </div>
  )
}
