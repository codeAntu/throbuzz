import React from 'react'

type ScreenProps = {
  className?: string
  children: React.ReactNode
}

export function Screen({ className, children }: ScreenProps) {
  return (
    <div className={`flex w-full items-center justify-center px-5`}>
      <div className={`flex h-[100dvh] max-w-[500px] flex-col py-5 ${className}`}>{children}</div>
    </div>
  )
}
