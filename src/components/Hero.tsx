export default function Hero() {
  return (
    <div className='flex flex-col items-center justify-center gap-9 text-black dark:text-white/5'>
      <img src='./icons/icon.png' alt='' className='w-1/2 sm:w-2/5' />
      <div className='flex w-4/5 flex-col items-center justify-center gap-2'>
        <div className='text-3xl font-semibold text-cyan-500'>Throbuzz</div>
        <div className='flex flex-col items-center justify-center text-center text-xs font-semibold text-black/40 dark:text-white/40'>
          <div>Welcome to Throbuzz </div>
          <div>Please log in or create an account to continue</div>
        </div>
      </div>
    </div>
  )
}
