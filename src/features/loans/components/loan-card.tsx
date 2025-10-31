import { ELoanStatus, EApprovalStatus } from '@/enums/financial.enum'
import { Banknote, Check, X, Send, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  formatCurrency,
  formatDate,
  calculatePercentage,
} from '@/lib/utils/format'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { StatusBadge } from '@/components/shared/status-badge'
import type { TLoan } from '../server/index.dto'

type LoanCardProps = {
  loan: TLoan
  onApprove?: (loan: TLoan) => void
  onReject?: (loan: TLoan) => void
  onDisburse?: (loan: TLoan) => void
}

export function LoanCard({
  loan,
  onApprove,
  onReject,
  onDisburse,
}: LoanCardProps) {
  const progress = calculatePercentage(
    loan.totalAmount - loan.outstandingAmount,
    loan.totalAmount
  )

  const canApprove = loan.approvalStatus === EApprovalStatus.PENDING_REVIEW
  const canDisburse =
    (loan.approvalStatus === EApprovalStatus.MANUAL_APPROVED ||
      loan.approvalStatus === EApprovalStatus.AUTO_APPROVED) &&
    loan.status === ELoanStatus.APPROVED

  const isOverdue =
    loan.status === ELoanStatus.ACTIVE && new Date(loan.dueDate) < new Date()

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='space-y-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-2'>
            <div className='bg-primary/10 rounded-lg p-2'>
              <Banknote className='text-primary h-5 w-5' />
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>Loan Number</p>
              <p className='font-mono text-sm font-medium'>{loan.loanNumber}</p>
            </div>
          </div>
          <div className='flex flex-col items-end gap-1'>
            <StatusBadge status={loan.status} />
            <StatusBadge status={loan.approvalStatus} className='text-xs' />
          </div>
        </div>

        <div>
          <p className='text-muted-foreground text-xs'>Outstanding Balance</p>
          <p
            className={cn(
              'text-3xl font-bold',
              isOverdue && 'text-destructive'
            )}
          >
            {formatCurrency(loan.outstandingAmount)}
          </p>
          <p className='text-muted-foreground mt-1 text-xs'>
            of {formatCurrency(loan.totalAmount)}
          </p>
        </div>

        {/* Progress Bar */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-muted-foreground'>Repayment Progress</span>
            <span className='font-medium'>{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className='h-2' />
        </div>

        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div>
            <p className='text-muted-foreground text-xs'>Principal</p>
            <p className='font-medium'>
              {formatCurrency(loan.principalAmount)}
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-xs'>Interest Rate</p>
            <p className='font-medium'>{loan.interestRate}%</p>
          </div>
          <div>
            <p className='text-muted-foreground text-xs'>Tenor</p>
            <p className='font-medium'>{loan.tenorMonths} months</p>
          </div>
          <div>
            <p className='text-muted-foreground text-xs'>Due Date</p>
            <p
              className={cn(
                'text-xs font-medium',
                isOverdue && 'text-destructive'
              )}
            >
              {formatDate(loan.dueDate, 'PP')}
            </p>
          </div>
        </div>

        {loan.purpose && (
          <div>
            <p className='text-muted-foreground text-xs'>Purpose</p>
            <p className='text-sm'>{loan.purpose}</p>
          </div>
        )}

        <div className='border-t pt-4'>
          <div className='mb-2 flex items-center gap-2'>
            <div className='bg-muted rounded-full p-1.5'>
              <User className='h-3 w-3' />
            </div>
            <p className='text-muted-foreground text-xs font-medium'>
              Customer Info
            </p>
          </div>
          <div className='space-y-1'>
            <p className='text-sm font-medium'>
              {loan.user.firstName} {loan.user.lastName}
            </p>
            <p className='text-muted-foreground text-xs'>{loan.user.email}</p>
            {loan.user.phoneNumber && (
              <p className='text-muted-foreground text-xs'>
                {loan.user.phoneNumber}
              </p>
            )}
            <p className='text-xs'>
              Credit Score:{' '}
              <span className='font-medium'>{loan.user.creditScore}</span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-2'>
        {canApprove && (
          <div className='grid grid-cols-2 gap-2'>
            <Button
              variant='default'
              size='sm'
              onClick={() => onApprove?.(loan)}
              className='w-full'
            >
              <Check className='mr-1 h-4 w-4' />
              Approve
            </Button>
            <Button
              variant='destructive'
              size='sm'
              onClick={() => onReject?.(loan)}
              className='w-full'
            >
              <X className='mr-1 h-4 w-4' />
              Reject
            </Button>
          </div>
        )}

        {canDisburse && (
          <Button
            variant='default'
            size='sm'
            onClick={() => onDisburse?.(loan)}
            className='w-full'
          >
            <Send className='mr-1 h-4 w-4' />
            Disburse
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
