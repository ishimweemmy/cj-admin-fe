import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency } from '@/lib/utils/format'
import { useApproveLoan } from '../server/use-loans'
import type { TLoan } from '../server/index.dto'
import { Check } from 'lucide-react'

const formSchema = z.object({
  notes: z.string().optional(),
})

type ApproveLoanForm = z.infer<typeof formSchema>

type ApproveLoanDialogProps = {
  loan: TLoan | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApproveLoanDialog({ loan, open, onOpenChange }: ApproveLoanDialogProps) {
  const { mutate: approveLoan, isPending } = useApproveLoan()

  const form = useForm<ApproveLoanForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
    },
  })

  const onSubmit = (values: ApproveLoanForm) => {
    if (!loan) return

    approveLoan(
      {
        loanId: loan.id,
        payload: { notes: values.notes || undefined }
      },
      {
        onSuccess: () => {
          form.reset()
          onOpenChange(false)
        },
      }
    )
  }

  if (!loan) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Loan</DialogTitle>
          <DialogDescription>
            Review and approve this loan application
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='bg-muted rounded-lg p-4 space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Loan Number</span>
              <span className='font-mono text-sm font-medium'>{loan.loanNumber}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Customer</span>
              <span className='text-sm font-medium'>{loan.user.firstName} {loan.user.lastName}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Principal Amount</span>
              <span className='text-sm font-semibold'>
                {formatCurrency(loan.principalAmount)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Total Amount</span>
              <span className='text-sm font-semibold'>
                {formatCurrency(loan.totalAmount)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Interest Rate</span>
              <span className='text-sm font-medium'>{loan.interestRate}%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Tenor</span>
              <span className='text-sm font-medium'>{loan.tenorMonths} months</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Credit Score</span>
              <span className='text-sm font-medium'>{loan.user.creditScore}</span>
            </div>
          </div>

          <Form {...form}>
            <form
              id='approve-loan-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Add any notes about the approval...'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            form='approve-loan-form'
            disabled={isPending}
          >
            <Check className='mr-2 h-4 w-4' />
            {isPending ? 'Approving...' : 'Approve Loan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
