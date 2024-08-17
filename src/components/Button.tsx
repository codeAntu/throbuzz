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
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2.5 rounded-xl border border-black bg-blue-500 px-9 py-3.5 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-[0.99] dark:border-white dark:bg-white dark:text-black ${className}`}
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
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2.5 rounded-xl border border-black bg-transparent px-9 py-3.5 text-sm font-semibold text-black shadow-sm duration-200 ease-in-out hover:scale-[0.99] dark:border-white dark:bg-transparent dark:text-white ${className}`}
      disabled={disabled}
      {...rest}
    >
      {leftIcon}
      {title}
      {rightIcon}
    </motion.button>
  )
}
