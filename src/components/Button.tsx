import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { ComponentProps, ForwardedRef } from 'react'

type buttonProps = ComponentProps<'button'> & {
  className?: string
  children: React.ReactNode
  variant?: 'filled' | 'accent' | 'accentOutline' | 'outline' | 'textAccent' | 'text' | 'icon' | 'zero'
}

const variants = {
  accent: ' w-full border-2 border-accent bg-accent px-9 py-3.5 text-white dark:text-black ',
  filled:
    ' w-full bg-black px-9 py-2.5 text-white dark:bg-white dark:text-black border-2 border-black dark:border-white',
  accentOutline: ' w-full border-2 border-accent text-accent px-9 py-3.5 ',
  outline: ' w-full  border-2 border-black text-black px-9 py-2.5 dark:border-white dark:text-white ',
  textAccent: 'text-accent dark:text-accent py-2.5',
  text: 'text-black dark:text-white py-2.5',
  icon: 'text-black dark:text-white',
  zero: '',
}

function Button(
  { className, children, variant = 'accent', ...rest }: buttonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex select-none items-center justify-center gap-2.5 rounded-[14px] text-sm font-semibold duration-100 hover:scale-[0.99] ' +
          ' ' +
          variants[variant] +
          ' ' +
          className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

const ForwardedButton = React.forwardRef(Button)
ForwardedButton.displayName = 'Button'

export { ForwardedButton as Button }

// export function Button({ className, children, variant = 'accent', ...rest }: buttonProps) {
//   return (
//     <motion.button
//       whileTap={{ scale: 0.95 }}
//       className={cn(
//         'flex select-none items-center justify-center gap-2.5 rounded-[14px] text-sm font-semibold duration-100 hover:scale-[0.99] ' +
//           ' ' +
//           variants[variant] +
//           ' ' +
//           className,
//       )}
//       {...rest}
//     >
//       {children}
//     </motion.button>
//   )
// }
