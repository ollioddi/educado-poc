import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

import { FormField } from '@/shared/form/components/form-field'
import { Button } from '@/shared/components/ui/button'

const testSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export function TestFormPage() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: testSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value)
    },
  })

  return (
    <div className="max-w-md mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold">Test Form</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void form.handleSubmit()
        }}
        className="space-y-4"
      >
        <form.Field name="email">
          {(field) => (
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              field={field}
              required
            />
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              field={field}
              required
              forgotPasswordButton={
                <button
                  type="button"
                  className="ml-auto text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              }
            />
          )}
        </form.Field>

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
