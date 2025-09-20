import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { Button } from '@/shared/components/ui/button'
import { useAppForm } from '@/shared/form/form'
import { useAuth, type LoginParams } from '@/shared/hooks/use-auth'
import { cn } from '@/shared/utilities/utils'

// 1) Zod schema matching your LoginParams
const loginSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .strict()

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<'form'>) => {
  const { t } = useTranslation()
  const { login } = useAuth()

  // 2) Provide typed defaults. Type inference comes from this object.
  const defaultValues: LoginParams = { email: '', password: '' }

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await login(value)
    },
  })

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('login.title')}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t('login.subtitle')}
          </p>
        </div>

        {/* Fields */}
        <div className="grid gap-6">
          {/* Email */}
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label={t('login.email')}
                type="email"
                placeholder={t('login.emailPlaceholder')}
                required
              />
            )}
          </form.AppField>

          {/* Password */}
          <form.AppField name="password">
            {(field) => (
              <field.PasswordField
                label={t('login.password')}
                required
                showForgotPassword
                placeholder="********"
              />
            )}
          </form.AppField>

          {/* Submit */}
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" className="w-full" disabled={!canSubmit}>
                {isSubmitting
                  ? t('login.loadingLogin')
                  : t('login.loginButton')}
              </Button>
            )}
          </form.Subscribe>

          {/* Divider */}
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              {t('login.orContinueWith')}
            </span>
          </div>

          {/* Social login (example) */}
          <Button variant="outline" className="w-full" type="button">
            {/* your icon */}
            {t('login.loginWithGitHub')}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm">
          {t('login.noAccount')}{' '}
          <button type="button" className="underline underline-offset-4">
            {t('login.signUp')}
          </button>
        </div>
      </form>
    </form.AppForm>
  )
}
