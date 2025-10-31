import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { formatCurrency, formatDate } from '@/lib/utils/format'
import { type Customer } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const customersColumns: ColumnDef<Customer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn('max-md:sticky start-0 z-10 rounded-tl-[inherit]'),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const firstName = row.original.firstName
      const lastName = row.original.lastName
      return (
        <div className='ps-3'>
          <p className='font-medium'>{`${firstName} ${lastName}`}</p>
          <p className='text-xs text-muted-foreground'>{row.original.email}</p>
        </div>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    cell: ({ row }) => (
      <span className='text-sm'>{row.getValue('phoneNumber') || 'N/A'}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'kycStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='KYC' />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue('kycStatus')} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'creditScore',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Credit Score' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.getValue('creditScore')}</span>
    ),
  },
  {
    id: 'creditLimit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Credit Limit' />
    ),
    cell: ({ row }) => {
      const creditLimit = row.original.creditLimit
      const availableCredit = row.original.availableCredit
      return creditLimit ? (
        <div>
          <p className='font-medium'>{formatCurrency(creditLimit)}</p>
          <p className='text-xs text-muted-foreground'>
            {formatCurrency(availableCredit || 0)} available
          </p>
        </div>
      ) : (
        <span className='text-muted-foreground'>N/A</span>
      )
    },
  },
  {
    id: 'loans',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Loans' />
    ),
    cell: ({ row }) => {
      const activeLoans = row.original.activeLoans
      const totalLoans = row.original.totalLoans
      return (
        <div className='text-sm'>
          <p className='font-medium'>{activeLoans} active</p>
          <p className='text-xs text-muted-foreground'>{totalLoans} total</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Joined' />
    ),
    cell: ({ row }) => (
      <span className='text-sm text-muted-foreground'>
        {formatDate(row.getValue('createdAt'), 'PP')}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    meta: {
      className: cn('max-md:sticky end-0 z-10 rounded-tr-[inherit]'),
    },
  },
]
