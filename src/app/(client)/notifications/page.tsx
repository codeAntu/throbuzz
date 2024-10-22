import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import { Ellipsis, EllipsisVertical } from 'lucide-react'

export default function NotificationsPage() {
  return (
    <Screen0 className=''>
      <Header title='Notifications' />
      <div className='grid gap-4 p-5'>
        <div className='text-lg font-semibold'>
          All Notifications
          <span className='px-2 text-accent'>120</span>
        </div>
        <div className='space-y-5'>
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      </div>
    </Screen0>
  )
}

function Notification() {
  return (
    <div className='flex items-center gap-1'>
      <div className='flex flex-grow items-center gap-3'>
        <img src='./images/img1.png' alt='' className='size-10 rounded-full' />
        <div className=''>
          <div className='line-clamp-2 text-sm font-semibold text-black/65 dark:text-white/65'>
            Notification Heading Notification Heading Notification Heading Notification Heading Notification Heading
            Notification Heading Notification Heading Notification Heading
          </div>
        </div>
      </div>
      <div>
        <EllipsisVertical size={20} />
      </div>
    </div>
  )
}
