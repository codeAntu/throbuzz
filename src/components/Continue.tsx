export default function Continue() {
  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='text-xs font-medium text-black/40 dark:text-white/50'>Continue with</div>
      <div className='flex w-full items-center justify-center gap-5'>
        <button>
          <img src='./icons/google.png' alt='' className='w-7 duration-100 hover:scale-[1.03]' />
        </button>
        <button>
          <img src='./icons/facebook.png' alt='' className='w-7 duration-100 hover:scale-[1.03]' />
        </button>
        <button>
          <img src='./icons/github.png' alt='' className='w-7 rounded-full bg-black duration-100 hover:scale-[1.03]' />
        </button>
        <button>
          <img src='./icons/twitter.png' alt='' className='w-7 duration-100 hover:scale-[1.03]' />
        </button>
      </div>
    </div>
  )
}
