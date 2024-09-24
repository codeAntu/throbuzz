'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'

export default function Page() {
  async function getNotifications() {
    console.log('Getting notifications')

    try {
      const response = await axios.post('/api/notification/getNotification')

      console.log(response)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <Screen className='gap-20'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>Notification</h1>
        <p>Page content</p>
      </div>
      <Button onClick={getNotifications} title='Get Notifications'></Button>
    </Screen>
  )
}
