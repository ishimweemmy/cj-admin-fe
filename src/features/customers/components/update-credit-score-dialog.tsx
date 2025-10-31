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
import { useUpdateCreditScore } from '../server/use-customers'
import type { Customer } from '../data/schema'
import type { TUpdateCreditScoreDto } from '../server/index.dto'
import { TrendingUp } from 'lucide-react'

const formSchema = z.object({
  newScore: z.number().min(300, 'Credit score must be at least 300').max(850, 'Credit score cannot exceed 850'),
  reason: z.string().min(1, 'Reason is required'),
  notes: z.string().optional(),
}) satisfies z.ZodType<TUpdateCreditScoreDto>

type UpdateCreditScoreDialogProps = {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateCreditScoreDialog({
  customer,
  open,
  onOpenChange,
}: UpdateCreditScoreDialogProps) {
  const { mutate: updateCreditScore, isPending } = useUpdateCreditScore()

  const form = useForm<TUpdateCreditScoreDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newScore: customer?.creditScore || 300,
      reason: '',
      notes: '',
    },
  })

  const onSubmit = (values: TUpdateCreditScoreDto) => {
    if (!customer) return

    updateCreditScore(
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
          <DialogTitle>Update Credit Score</DialogTitle>
          <DialogDescription>
            Manually adjust customer credit score
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
              <span className='text-sm text-muted-foreground'>Current Score</span>
              <span className='text-xl font-bold'>{customer.creditScore}</span>
            </div>
          </div>

          <Form {...form}>
            <form
              id='update-credit-score-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='newScore'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New Credit Score (300-850) <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='700'
                        min={300}
                        max={850}
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
                        placeholder='e.g., Manual adjustment based on external credit report...'
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
            form='update-credit-score-form'
            disabled={isPending}
          >
            <TrendingUp className='mr-2 h-4 w-4' />
            {isPending ? 'Updating...' : 'Update Credit Score'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
