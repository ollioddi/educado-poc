import * as React from 'react'

import { cn } from '@/shared/utilities/utils'

const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <input type={type} data-slot="input" className={cn(className)} {...props} />
  )
}

export { Input }
