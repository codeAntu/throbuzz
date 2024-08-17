export default function Hero() {
  return (
    <div className='flex flex-col items-center justify-center gap-10 text-black dark:text-white'>
      <img src='./icons/icon.svg ' alt='' className='w-1/2 sm:w-2/5' />
      <div className='flex w-4/5 flex-col items-center justify-center gap-2'>
        <div className='text-3xl font-semibold text-cyan-500'>Throbuzz</div>
        <div className='text-center text-xs font-semibold text-black/60 dark:text-white/50'>
          Welcome to Throbuzz . Please log in or create an account to continue.
        </div>
      </div>
    </div>
  )
}
