import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { StatusBadge } from '@/components/shared/status-badge'
import { formatCurrency, formatDateTime } from '@/lib/utils/format'
import { ArrowDownLeft, ArrowUpRight, Banknote, Plus, Minus } from 'lucide-react'
import type { Transaction } from '@/types/financial.type'
import { ETransactionType } from '@/enums/financial.enum'

type RecentTransactionsListProps = {
  transactions: Transaction[]
  isLoading: boolean
}

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

export function RecentTransactionsList({
  transactions,
  isLoading,
}: RecentTransactionsListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex items-center gap-4'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='flex-1 space-y-1'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-3 w-24' />
                </div>
                <Skeleton className='h-6 w-20' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-center text-sm py-8'>
            No transactions yet
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {transactions.map((transaction) => (
            <div key={transaction.id} className='flex items-center gap-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                {getTransactionIcon(transaction.type)}
              </div>
              <div className='flex-1 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {transaction.description}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {formatDateTime(transaction.createdAt)}
                </p>
              </div>
              <div className='text-right'>
                <p className={`text-sm font-medium ${
                  transaction.type === ETransactionType.DEPOSIT ||
                  transaction.type === ETransactionType.LOAN_DISBURSEMENT
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {transaction.type === ETransactionType.DEPOSIT ||
                  transaction.type === ETransactionType.LOAN_DISBURSEMENT
                    ? '+'
                    : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
                <StatusBadge status={transaction.status} className='mt-1' />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
