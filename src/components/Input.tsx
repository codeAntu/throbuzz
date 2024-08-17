import React, { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function Input({ leftIcon, rightIcon, ...rest }: InputProps) {
  return (
    <div className='border-black/10 bg-black/5 text-black dark:border-white/10 dark:bg-white/5 dark:text-white flex w-full gap-4 rounded-2xl border px-4 py-4 text-sm font-medium shadow-sm'>
      {leftIcon}
      <input className='bg-transparent text-black dark:text-white w-full opacity-70' {...rest} />
      {rightIcon}
    </div>
  )
}
