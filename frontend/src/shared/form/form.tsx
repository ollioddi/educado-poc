import { createFormHook } from '@tanstack/react-form'

import { PasswordField } from './components/form-password-input'
import { TextField } from './components/form-text-input'
import { fieldContext, formContext } from './context/form-context'

// Create the custom form hook with our contexts and field components
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    PasswordField,
  },
  formComponents: {},
})
