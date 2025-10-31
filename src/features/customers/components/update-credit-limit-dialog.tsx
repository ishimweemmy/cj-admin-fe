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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency } from '@/lib/utils/format'
import { useUpdateCreditLimit } from '../server/use-customers'
import type { Customer } from '../data/schema'
import type { TUpdateCreditLimitDto } from '../server/index.dto'
import { CreditCard } from 'lucide-react'

const formSchema = z.object({
  newLimit: z.number().min(0, 'Credit limit must be at least 0'),
  reason: z.string().min(1, 'Reason is required'),
  notes: z.string().optional(),
}) satisfies z.ZodType<TUpdateCreditLimitDto>

type UpdateCreditLimitDialogProps = {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateCreditLimitDialog({
  customer,
  open,
  onOpenChange,
}: UpdateCreditLimitDialogProps) {
  const { mutate: updateCreditLimit, isPending } = useUpdateCreditLimit()

  const form = useForm<TUpdateCreditLimitDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newLimit: customer?.creditLimit || 0,
      reason: '',
      notes: '',
    },
  })

  const onSubmit = (values: TUpdateCreditLimitDto) => {
    if (!customer) return

    updateCreditLimit(
      {
        customerId: customer.id,
        payload: values,
      },
      {
        onSuccess: () => {
          form.reset()
          onOpenChange(false)
        },
      }
    )
  }

  if (!customer) return null

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
          <DialogTitle>Update Credit Limit</DialogTitle>
          <DialogDescription>
            Adjust customer credit limit
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='bg-muted rounded-lg p-4 space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Customer</span>
              <span className='text-sm font-medium'>
                {customer.firstName} {customer.lastName}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Current Limit</span>
              <span className='text-sm font-bold'>
                {customer.creditLimit ? formatCurrency(customer.creditLimit) : 'N/A'}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Available</span>
              <span className='text-sm font-medium'>
                {customer.availableCredit ? formatCurrency(customer.availableCredit) : 'N/A'}
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              id='update-credit-limit-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='newLimit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New Credit Limit <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='50000'
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='reason'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Reason <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='e.g., Customer requested increase, good payment history...'
                        rows={3}
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
            form='update-credit-limit-form'
            disabled={isPending}
          >
            <CreditCard className='mr-2 h-4 w-4' />
            {isPending ? 'Updating...' : 'Update Credit Limit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
