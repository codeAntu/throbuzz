// import React, { ComponentProps } from 'react'

// type InputProps = ComponentProps<'input'> & {
//   leftIcon?: React.ReactNode
//   rightIcon?: React.ReactNode
// }

// export default function Input({ leftIcon, rightIcon, ...rest }: InputProps) {
//   return (
//     <div className='flex w-full items-center justify-center gap-4 rounded-2xl border border-black/10 bg-black/5 px-4 text-sm font-medium text-black shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white'>
//       {leftIcon}
//       <input
//         className='w-full bg-transparent py-4 text-black opacity-70 outline-none autofill:bg-transparent focus:bg-red-300 dark:text-white'
//         {...rest}
//       />
//       {rightIcon}
//     </div>
//   )
// }
import React, { forwardRef, ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ leftIcon, rightIcon, ...rest }, ref) => {
  return (
    <div className='flex w-full items-center justify-center gap-4 rounded-2xl border border-black/10 bg-black/5 px-4 text-sm font-medium text-black dark:border-white/10 dark:bg-white/5 dark:text-white'>
      {leftIcon}
      <input
        ref={ref}
        className='w-full bg-transparent py-4 text-black opacity-70 outline-none autofill:bg-transparent dark:text-white'
        {...rest}
      />
      {rightIcon}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
