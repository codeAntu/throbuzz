import React, { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function Input({ leftIcon, rightIcon, ...rest }: InputProps) {
  return (
    <div className='flex w-full gap-4 rounded-2xl border border-black/10 bg-black/5 px-4 py-4 text-sm font-medium text-black shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white'>
      {leftIcon}
      <input className='w-full bg-transparent text-black opacity-70 outline-none dark:text-white' {...rest} />
      {rightIcon}
    </div>
  )
}
