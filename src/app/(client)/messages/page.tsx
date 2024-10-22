import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import { Send } from 'lucide-react'

export default function MessagesPage() {
  return (
    <Screen0 className=''>
      <Header title='Messages' />
      <div className='flex h-[60dvh] flex-col items-center justify-center gap-10 p-8 text-center text-2xl font-bold leading-10 text-black/60 dark:text-white/60'>
        <Send size={60} />
        <div>Messages will be added in the next update.</div>
      </div>
    </Screen0>
  )
}
