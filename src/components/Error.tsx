import { AlertCircle } from 'lucide-react'
import { Ic } from './Icon'

export default function Error({ error }: { error: string }) {
  return (
    <div className='flex items-center justify-center gap-2.5 text-xs'>
      {/* <Ic Icon={AlertCircle} className='text-red-500' /> */}
      <p className='text-center text-red-500/80'>{error}</p>
    </div>
  )
}
