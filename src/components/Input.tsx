export default function Input({
  type,
  name,
  className,
  onChange,
  placeholder,
  leftIcon,
  rightIcon,
}: {
  label?: string
  type?: string
  name?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}) {
  return (
    <div
      className={`flex w-full gap-4 rounded-xl border border-black/10 bg-black/10 px-4 py-4 text-sm font-medium text-black shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white ${className}`}
    >
      {leftIcon}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className='w-full bg-transparent text-black placeholder-black opacity-60 focus:outline-none dark:text-white dark:placeholder-white'
        onChange={onChange}
      />
      {rightIcon}
    </div>
  )
}
