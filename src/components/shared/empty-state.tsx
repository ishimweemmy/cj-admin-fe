import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <div className='bg-muted mb-4 rounded-full p-6'>
        <Icon className='text-muted-foreground h-12 w-12' />
      </div>
      <h3 className='mb-2 text-lg font-semibold'>{title}</h3>
      <p className='text-muted-foreground mb-6 max-w-sm text-sm'>{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
