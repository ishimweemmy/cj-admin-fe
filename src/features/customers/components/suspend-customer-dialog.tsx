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
import { useSuspendCustomer } from '../server/use-customers'
import type { Customer } from '../data/schema'
import type { TSuspendCustomerDto } from '../server/index.dto'
import { Ban } from 'lucide-react'

const formSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
  notes: z.string().optional(),
}) satisfies z.ZodType<TSuspendCustomerDto>

type SuspendCustomerDialogProps = {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuspendCustomerDialog({
  customer,
  open,
  onOpenChange,
}: SuspendCustomerDialogProps) {
  const { mutate: suspendCustomer, isPending } = useSuspendCustomer()

  const form = useForm<TSuspendCustomerDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: '',
      notes: '',
    },
  })

  const onSubmit = (values: TSuspendCustomerDto) => {
    if (!customer) return

    suspendCustomer(
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
          <DialogTitle>Suspend Customer</DialogTitle>
          <DialogDescription>
            Provide a reason for suspending this customer account
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='bg-muted rounded-lg p-4 space-y-1'>
            <p className='font-medium'>
              {customer.firstName} {customer.lastName}
            </p>
            <p className='text-sm text-muted-foreground'>{customer.email}</p>
          </div>

          <Form {...form}>
            <form
              id='suspend-customer-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
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
                        placeholder='e.g., Suspicious activity, policy violation...'
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
            form='suspend-customer-form'
            variant='destructive'
            disabled={isPending}
          >
            <Ban className='mr-2 h-4 w-4' />
            {isPending ? 'Suspending...' : 'Suspend Customer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
