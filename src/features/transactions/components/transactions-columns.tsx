import { type ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { formatCurrency, formatDateTime } from '@/lib/utils/format'
import { ArrowDownLeft, ArrowUpRight, Banknote, Plus, Minus } from 'lucide-react'
import { ETransactionType } from '@/enums/financial.enum'
import type { TTransactionAdmin } from '../server/index.dto'
import { cn } from '@/lib/utils'

const getTransactionIcon = (type: ETransactionType) => {
  switch (type) {
    case ETransactionType.DEPOSIT:
      return <ArrowDownLeft className='h-4 w-4 text-green-600' />
    case ETransactionType.WITHDRAWAL:
      return <ArrowUpRight className='h-4 w-4 text-red-600' />
    case ETransactionType.LOAN_DISBURSEMENT:
      return <Plus className='h-4 w-4 text-blue-600' />
    case ETransactionType.LOAN_REPAYMENT:
      return <Minus className='h-4 w-4 text-orange-600' />
    default:
      return <Banknote className='h-4 w-4' />
  }
}

export const transactionsColumns: ColumnDef<TTransactionAdmin>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <div className='text-sm'>{formatDateTime(row.getValue('createdAt'))}</div>
    ),
  },
  {
    accessorKey: 'transactionReference',
    header: 'Reference',
    cell: ({ row }) => (
      <div className='font-mono text-xs'>{row.getValue('transactionReference')}</div>
    ),
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ row }) => (
      <div>
        <div className='text-sm font-medium'>{row.getValue('customerName')}</div>
        <div className='text-xs text-muted-foreground'>{row.original.customerEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as ETransactionType
      return (
        <div className='flex items-center gap-2'>
          {getTransactionIcon(type)}
          <span className='text-xs'>{type.replace(/_/g, ' ')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div className='text-sm'>{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const type = row.original.type
      const amount = row.getValue('amount') as number
      const isCredit =
        type === ETransactionType.DEPOSIT || type === ETransactionType.LOAN_DISBURSEMENT

      return (
        <div
          className={cn(
            'text-right font-medium',
            isCredit ? 'text-green-600' : 'text-red-600'
          )}
        >
          {isCredit ? '+' : '-'}
          {formatCurrency(amount)}
        </div>
      )
    },
  },
  {
    accessorKey: 'balanceAfter',
    header: () => <div className='text-right'>Balance After</div>,
    cell: ({ row }) => (
      <div className='text-right text-sm'>
        {formatCurrency(row.getValue('balanceAfter'))}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
