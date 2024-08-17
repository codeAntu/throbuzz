import React, { ComponentProps } from 'react'

type ScreenProps = ComponentProps<'div'>

export function Screen({ children, className, ...rest }: ScreenProps) {
  return (
    <div className={`flex w-full items-center justify-center bg-white px-5 dark:bg-black`}>
      <div className={`flex min-h-[100dvh] max-w-[500px] flex-col py-5 ${className || ''}`} {...rest}>
        {children}
      </div>
    </div>
  )
}
