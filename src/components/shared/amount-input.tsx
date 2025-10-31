import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/lib/utils/format'
import { useState } from 'react'

type AmountInputProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  error?: string
  helpText?: string
  placeholder?: string
}

export function AmountInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  error,
  helpText,
  placeholder = '0',
}: AmountInputProps) {
  const [displayValue, setDisplayValue] = useState(value > 0 ? value.toString() : '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '')
    setDisplayValue(inputValue)
    onChange(inputValue ? parseInt(inputValue, 10) : 0)
  }

  const handleBlur = () => {
    if (value > 0) {
      setDisplayValue(value.toString())
    }
  }

  return (
    <div className='space-y-2'>
      <Label htmlFor='amount'>
        {label}
        {max && (
          <span className='text-muted-foreground ml-2 text-xs font-normal'>
            Max: {formatCurrency(max)}
          </span>
        )}
      </Label>
      <div className='relative'>
        <span className='text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm'>
          RWF
        </span>
        <Input
          id='amount'
          type='text'
          inputMode='numeric'
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className='pl-14'
          aria-invalid={!!error}
        />
      </div>
      {helpText && !error && (
        <p className='text-muted-foreground text-xs'>{helpText}</p>
      )}
      {error && <p className='text-xs text-destructive'>{error}</p>}
      {value > 0 && (
        <p className='text-muted-foreground text-xs'>
          Amount: {formatCurrency(value)}
        </p>
      )}
    </div>
  )
}
