import { Badge } from '@/components/ui/badge'
import { getStatusBadgeVariant } from '@/lib/utils/format'

type StatusBadgeProps = {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = getStatusBadgeVariant(status)

  return (
    <Badge variant={variant as any} className={className}>
      {status.replace(/_/g, ' ')}
    </Badge>
  )
}
