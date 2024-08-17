import { motion } from 'framer-motion'
import { ComponentProps } from 'react'

type buttonProps = ComponentProps<'button'> & {
  className?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Button({ title, className, leftIcon, rightIcon, ...rest }: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      className={`bg-accent border-accent flex w-full items-center justify-center gap-2.5 rounded-2xl border px-9 py-3.5 text-sm font-semibold text-white duration-100 hover:scale-[0.99] dark:text-black ${className}`}
      {...rest}
    >
      {leftIcon}
      {title}
      {rightIcon}
    </motion.button>
  )
}

export function OutlineButton({ title, className, leftIcon, rightIcon, ...rest }: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      {...rest}
      className={`flex w-full items-center justify-center gap-2.5 rounded-2xl border border-black/70 bg-transparent px-9 py-3.5 text-sm font-semibold text-black/70 duration-100 hover:scale-[0.99] dark:border-white/70 dark:text-white/70 ${className}`}
    >
      {leftIcon}
      {title}
      {rightIcon}
    </motion.button>
  )
}
