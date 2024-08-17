import { motion } from 'framer-motion'

type buttonProps = {
  title?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  rest?: any
}

export function Button({ title, onClick, disabled, className, leftIcon, rightIcon, ...rest }: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2.5 rounded-2xl border border-black bg-black px-9 py-3.5 text-sm font-semibold text-white hover:scale-[0.99] dark:bg-white dark:text-black ${className}`}
      disabled={disabled}
      {...rest}
    >
      {leftIcon}
      {title}
      {rightIcon}
    </motion.button>
  )
}

export function OutlineButton({ title, onClick, disabled, className, leftIcon, rightIcon, ...rest }: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2.5 rounded-2xl border border-black/80 bg-transparent px-9 py-3.5 text-sm font-semibold text-black/80 shadow-sm hover:scale-[0.99] dark:border-white/80 dark:bg-transparent dark:text-white/80 ${className}`}
      disabled={disabled}
      {...rest}
    >
      {leftIcon}
      {title}
      {rightIcon}
    </motion.button>
  )
}
