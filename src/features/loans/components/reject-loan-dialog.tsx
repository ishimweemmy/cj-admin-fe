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
import { useRejectLoan } from '../server/use-loans'
import type { TLoan } from '../server/index.dto'
import { X } from 'lucide-react'

const formSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
  notes: z.string().optional(),
})

type RejectLoanForm = z.infer<typeof formSchema>

type RejectLoanDialogProps = {
  loan: TLoan | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RejectLoanDialog({ loan, open, onOpenChange }: RejectLoanDialogProps) {
  const { mutate: rejectLoan, isPending } = useRejectLoan()

  const form = useForm<RejectLoanForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: '',
      notes: '',
    },
  })

  const onSubmit = (values: RejectLoanForm) => {
    if (!loan) return

    rejectLoan(
      {
        loanId: loan.id,
        payload: {
          reason: values.reason,
          notes: values.notes || undefined,
        },
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
          <DialogTitle>Reject Loan</DialogTitle>
          <DialogDescription>
            Provide a reason for rejecting this loan application
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
              <span className='text-sm text-muted-foreground'>Amount Requested</span>
              <span className='text-sm font-semibold'>
                {formatCurrency(loan.principalAmount)}
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              id='reject-loan-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='reason'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Reason for rejection <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='e.g., Insufficient credit score, incomplete documentation...'
                        rows={3}
                        className='border-destructive/50 focus-visible:ring-destructive'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Any additional information...'
                        rows={2}
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
            form='reject-loan-form'
            variant='destructive'
            disabled={isPending}
          >
            <X className='mr-2 h-4 w-4' />
            {isPending ? 'Rejecting...' : 'Reject Loan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
