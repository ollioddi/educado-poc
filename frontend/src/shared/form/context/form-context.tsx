import { createFormHookContexts } from '@tanstack/react-form'

// Create the form and field contexts for reusable form components
export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()