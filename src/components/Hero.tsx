export default function Hero() {
  return (
    <div className='flex flex-col items-center justify-center gap-8 py-10'>
      <img src='./icons/icon.svg ' alt='' className='w-3/5' />
      <div className='flex w-4/5 flex-col items-center justify-center gap-2'>
        <div className='text-3xl font-semibold'>Throbuzz</div>
        <div className='text-center text-xs font-semibold text-white/50'>
          Welcome to Throbuzz . Please log in or create an account to continue.
        </div>
      </div>
    </div>
  )
}
