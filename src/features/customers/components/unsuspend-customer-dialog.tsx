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
import { useUnsuspendCustomer } from '../server/use-customers'
import type { Customer } from '../data/schema'
import type { TUnsuspendCustomerDto } from '../server/index.dto'
import { ShieldCheck } from 'lucide-react'

const formSchema = z.object({
  notes: z.string().optional(),
}) satisfies z.ZodType<TUnsuspendCustomerDto>

type UnsuspendCustomerDialogProps = {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UnsuspendCustomerDialog({
  customer,
  open,
  onOpenChange,
}: UnsuspendCustomerDialogProps) {
  const { mutate: unsuspendCustomer, isPending } = useUnsuspendCustomer()

  const form = useForm<TUnsuspendCustomerDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
    },
  })

  const onSubmit = (values: TUnsuspendCustomerDto) => {
    if (!customer) return

    unsuspendCustomer(
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
          <DialogTitle>Unsuspend Customer</DialogTitle>
          <DialogDescription>
            Restore this customer account access
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
              id='unsuspend-customer-form'
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
                        placeholder='e.g., Issue resolved, customer verified...'
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
            form='unsuspend-customer-form'
            disabled={isPending}
          >
            <ShieldCheck className='mr-2 h-4 w-4' />
            {isPending ? 'Unsuspending...' : 'Unsuspend Customer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
