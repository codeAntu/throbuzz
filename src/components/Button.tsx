import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ComponentProps } from 'react'

type buttonProps = ComponentProps<'button'> & {
  className?: string
  children: React.ReactNode
}

export function Button({ className, children, ...rest }: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-accent bg-accent px-9 py-3.5 text-sm font-semibold text-white duration-100 hover:scale-[0.99] dark:text-black ' +
          className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export function OutlineButton({ className, children, ...rest }: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      className={cn(
        'flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-black bg-transparent px-9 py-3.5 text-sm font-semibold text-black duration-100 hover:scale-[0.99] dark:border-white dark:text-white ' +
          className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export function TextButton({ className, children, ...rest }: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      className={cn(
        'flex items-center gap-2.5 text-sm font-semibold text-accent duration-100 hover:scale-[0.99] ' + className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export function IconButton({ className, children, ...rest }: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center justify-center text-black duration-100 hover:scale-[0.9] dark:bg-white ' + className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
