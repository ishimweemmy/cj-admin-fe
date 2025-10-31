import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  isLoading?: boolean
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  isLoading,
  trend,
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-4 rounded-full' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='mt-1 h-3 w-40' />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {Icon && (
          <Icon className='text-muted-foreground h-4 w-4' />
        )}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        {(description || trend) && (
          <p className='text-muted-foreground text-xs'>
            {trend && (
              <span className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
            {trend && description && ' '}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
