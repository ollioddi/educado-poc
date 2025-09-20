import { useId } from 'react'

import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/utilities/utils'

import { useFieldContext } from '../context/form-context'
import { getDescribedBy, getErrorMessage } from '../utilities/form-utils'

interface TextFieldProps {
  readonly label: string
  readonly placeholder?: string
  readonly required?: boolean
  readonly description?: string
  readonly type?: 'text' | 'email' | 'password'
  readonly className?: string
}

export const TextField = ({
  label,
  placeholder,
  required = false,
  description,
  type = 'text',
  className,
}: TextFieldProps) => {
  const field = useFieldContext<string>()
  const id = useId()
  const hasError = field.state.meta.errors.length > 0

  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      <div className="flex items-center">
        <Label
          htmlFor={id}
          className={cn(
            'flex items-center gap-1',
            hasError && 'text-destructive',
          )}
        >
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      </div>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value)
        }}
        onBlur={field.handleBlur}
        aria-invalid={hasError}
        aria-describedby={getDescribedBy(hasError, description, id)}
      />

      {description && !hasError && (
        <p id={`${id}-description`} className="text-muted-foreground text-sm">
          {description}
        </p>
      )}

      {hasError && (
        <p id={`${id}-error`} className="text-destructive text-sm">
          {getErrorMessage(field.state.meta.errors[0])}
        </p>
      )}
    </div>
  )
}
