import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/utilities/utils'

import { useFieldContext } from '../context/form-context'
import { getDescribedBy, getErrorMessage } from '../utilities/form-utils'

interface PasswordFieldProps {
  readonly label: string
  readonly placeholder?: string
  readonly required?: boolean
  readonly description?: string
  readonly className?: string
  readonly showForgotPassword?: boolean
  readonly onForgotPassword?: () => void
}

export const PasswordField = ({
  label,
  placeholder,
  required = false,
  description,
  className,
  showForgotPassword = false,
  onForgotPassword,
}: PasswordFieldProps) => {
  const { t } = useTranslation()
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

        {showForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            {t('login.forgotPassword')}
          </button>
        )}
      </div>

      <Input
        id={id}
        type="password"
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
