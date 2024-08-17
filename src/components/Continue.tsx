import { Facebook, Github } from 'lucide-react'
import { Ic } from './Icon'

export default function Continue() {
  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='text-xs font-medium text-black/40 dark:text-white/50'>Continue with</div>
      <div className='flex w-full items-center justify-center gap-5'>
        <Ic
          Icon={Github}
          size={30}
          className='rounded-lg bg-black/10 p-1 text-black/60 dark:bg-white/10 dark:text-white/60'
        />
        <Ic
          Icon={Facebook}
          size={30}
          className='rounded-lg bg-black/10 p-1 text-black/60 dark:bg-white/10 dark:text-white/60'
        />
        <Ic
          Icon={Github}
          size={30}
          className='rounded-lg bg-black/10 p-1 text-black/60 dark:bg-white/10 dark:text-white/60'
        />
        <Ic
          Icon={Facebook}
          size={30}
          className='rounded-lg bg-black/10 p-1 text-black/60 dark:bg-white/10 dark:text-white/60'
        />
      </div>
    </div>
  )
}
