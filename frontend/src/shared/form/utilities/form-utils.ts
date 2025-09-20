// Helper function to get error message from various error types
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
  }

  if (error != null && typeof error === 'object') {
    if ('message' in error) {
      return String((error as { message: unknown }).message)
    }
  }

  return 'Invalid input'
}
export function getDescribedBy(hasErrors: boolean, description: string | undefined, id: string) {
  if (hasErrors) {
    return description ? `${id}-error ${id}-description` : `${id}-error`
  }
  return description ? `${id}-description` : undefined
}