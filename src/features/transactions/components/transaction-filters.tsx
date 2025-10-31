import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ETransactionType, ETransactionStatus } from '@/enums/financial.enum'
import { X } from 'lucide-react'

type TransactionFiltersProps = {
  filters: {
    type?: string
    status?: string
    search?: string
  }
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
}

export function TransactionFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: TransactionFiltersProps) {
  const hasFilters = filters.type || filters.status || filters.search

  return (
    <div className='flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-end'>
      <div className='flex-1 space-y-2'>
        <Label htmlFor='type'>Type</Label>
        <Select
          value={filters.type || ''}
          onValueChange={(value) => onFilterChange('type', value)}
        >
          <SelectTrigger id='type'>
            <SelectValue placeholder='All types' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=''>All types</SelectItem>
            {Object.values(ETransactionType).map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex-1 space-y-2'>
        <Label htmlFor='status'>Status</Label>
        <Select
          value={filters.status || ''}
          onValueChange={(value) => onFilterChange('status', value)}
        >
          <SelectTrigger id='status'>
            <SelectValue placeholder='All statuses' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=''>All statuses</SelectItem>
            {Object.values(ETransactionStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex-1 space-y-2'>
        <Label htmlFor='search'>Search by Reference</Label>
        <Input
          id='search'
          placeholder='Transaction reference...'
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>

      {hasFilters && (
        <Button
          variant='ghost'
          size='icon'
          onClick={onClearFilters}
          title='Clear filters'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  )
}
