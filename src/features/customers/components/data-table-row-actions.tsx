import { type Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Customer } from '../data/schema'
import { useCustomers } from './customers-provider'
import { MoreHorizontal, Ban, ShieldCheck, CreditCard, TrendingUp } from 'lucide-react'

type DataTableRowActionsProps = {
  row: Row<Customer>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const customer = row.original
  const {
    setSelectedCustomer,
    setSuspendDialogOpen,
    setUnsuspendDialogOpen,
    setCreditLimitDialogOpen,
    setCreditScoreDialogOpen,
  } = useCustomers()

  const isSuspended = customer.status === 'SUSPENDED'

  const handleSuspend = () => {
    setSelectedCustomer(customer)
    setSuspendDialogOpen(true)
  }

  const handleUnsuspend = () => {
    setSelectedCustomer(customer)
    setUnsuspendDialogOpen(true)
  }

  const handleUpdateCreditLimit = () => {
    setSelectedCustomer(customer)
    setCreditLimitDialogOpen(true)
  }

  const handleUpdateCreditScore = () => {
    setSelectedCustomer(customer)
    setCreditScoreDialogOpen(true)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <MoreHorizontal className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[180px]'>
        {isSuspended ? (
          <DropdownMenuItem onClick={handleUnsuspend}>
            <ShieldCheck className='mr-2 h-4 w-4' />
            Unsuspend
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleSuspend}>
            <Ban className='mr-2 h-4 w-4' />
            Suspend
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleUpdateCreditLimit}>
          <CreditCard className='mr-2 h-4 w-4' />
          Update Credit Limit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpdateCreditScore}>
          <TrendingUp className='mr-2 h-4 w-4' />
          Update Credit Score
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
