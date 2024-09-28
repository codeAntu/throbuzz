import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type ScreenProps = ComponentProps<'div'>

const variants = {
  default: 'bg-white text-black dark:bg-black dark:text-white',
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-secondary-500 text-white',
  danger: 'bg-danger-500 text-white',
  success: 'bg-success-500 text-white',
  warning: 'bg-warning-500 text-white',
}

export function Screen({ children, className, ...rest }: ScreenProps) {
  return (
    <div className={`flex w-full items-center justify-center bg-white text-black dark:bg-black dark:text-white`}>
      <div
        className={cn('relative flex min-h-[100dvh] w-full max-w-[800px] flex-col px-5 py-5 ' + className)}
        {...rest}
      >
        {children}
      </div>
    </div>
  )
}

export function Screen0({ children, className, ...rest }: ScreenProps) {
  return (
    <div className={`flex w-full items-center justify-center bg-white text-black dark:bg-black dark:text-white`}>
      <div className={cn('flex min-h-[100dvh] w-full max-w-[800px] flex-col ' + className)} {...rest}>
        {children}
      </div>
    </div>
  )
}
