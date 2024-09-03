import React, { ComponentProps } from 'react'

type ScreenProps = ComponentProps<'div'>

export function Screen({ children, className, ...rest }: ScreenProps) {
  return (
    <div className={`flex w-full items-center justify-center bg-slate-200 dark:bg-slate-950`}>
      <div
        className={`relative flex min-h-[100dvh] w-full max-w-[800px] flex-col bg-white px-5 py-5 dark:bg-black ${className || ''}`}
        {...rest}
      >
        {children}
      </div>
    </div>
  )
}

export function Screen0({ children, className, ...rest }: ScreenProps) {
  return (
    <div className={`flex w-full items-center justify-center bg-slate-100 dark:bg-slate-950`}>
      <div
        className={`flex min-h-[100dvh] w-full max-w-[800px] flex-col bg-white dark:bg-black ${className || ''}`}
        {...rest}
      >
        {children}
      </div>
    </div>
  )
}
