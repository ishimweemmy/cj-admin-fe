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
import { useDisburseLoan } from '../server/use-loans'
import type { TLoan } from '../server/index.dto'
import { Send } from 'lucide-react'

const formSchema = z.object({
  notes: z.string().optional(),
})

type DisburseLoanForm = z.infer<typeof formSchema>

type DisburseLoanDialogProps = {
  loan: TLoan | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DisburseLoanDialog({ loan, open, onOpenChange }: DisburseLoanDialogProps) {
  const { mutate: disburseLoan, isPending } = useDisburseLoan()

  const form = useForm<DisburseLoanForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
    },
  })

  const onSubmit = (values: DisburseLoanForm) => {
    if (!loan) return

    disburseLoan(
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
          <DialogTitle>Disburse Loan</DialogTitle>
          <DialogDescription>
            Confirm loan disbursement to customer savings account
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
              <span className='text-sm text-muted-foreground'>Amount to Disburse</span>
              <span className='text-lg font-bold'>
                {formatCurrency(loan.principalAmount)}
              </span>
            </div>
            {loan.savingsAccountNumber && (
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Account Number</span>
                <span className='font-mono text-sm font-medium'>{loan.savingsAccountNumber}</span>
              </div>
            )}
          </div>

          <div className='bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md p-3'>
            <p className='text-sm text-blue-900 dark:text-blue-100'>
              This will transfer the principal amount to the customer's savings account and mark the loan as disbursed.
            </p>
          </div>

          <Form {...form}>
            <form
              id='disburse-loan-form'
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
                        placeholder='Add any notes about the disbursement...'
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
            form='disburse-loan-form'
            disabled={isPending}
          >
            <Send className='mr-2 h-4 w-4' />
            {isPending ? 'Disbursing...' : 'Disburse Loan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
