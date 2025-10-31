import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateProfileSchema } from './server/schema'
import { useUpdateProfile } from './server/use-profile'
import { useAuthStore } from '@/stores/auth-store'
import type { z } from 'zod'

type ProfileFormValues = z.infer<typeof updateProfileSchema>

export function ProfileForm() {
  const profile = useAuthStore((state) => state.auth.user)
  const updateMutation = useUpdateProfile()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phoneNumber: profile.phoneNumber || '',
      })
    }
  }, [profile, form])

  const onSubmit = (data: ProfileFormValues) => {
    updateMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Read-only fields */}
        <div className='space-y-4 rounded-lg border p-4'>
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>Role</label>
            <Input value={profile?.role || ''} disabled className='bg-muted' />
          </div>
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>Email</label>
            <Input value={profile?.email || ''} disabled className='bg-muted' />
            <p className='text-muted-foreground text-xs'>
              Email cannot be changed after registration
            </p>
          </div>
        </div>

        {/* Editable fields */}
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormDescription>Your first name as it appears on official documents</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormDescription>Your last name as it appears on official documents</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='+250 780 000 000' {...field} />
              </FormControl>
              <FormDescription>Your contact phone number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Updating...' : 'Update profile'}
        </Button>
      </form>
    </Form>
  )
}
