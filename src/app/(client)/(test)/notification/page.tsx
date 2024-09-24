'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function Page() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [nextPage, setNextPage] = useState('')

  // async function getNotifications() {
  //   console.log('Getting notifications')

  //   try {
  //     const response = await axios.post('/api/notification/getNotification')

  //     console.log(response)
  //   } catch (error: any) {
  //     console.log(error.message)
  //   }
  // }

  async function createNotification() {
    console.log('Creating notification')

    try {
      const response = await axios.post('/api/notification/createNotification')
      console.log(response)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  async function getNotifications() {
    console.log('Getting notifications')
    try {
      const response = await axios.post('/api/notification/getNotification')
      console.log(response)

      setNotifications(response.data.notifications)
      setNextPage(response.data.nextLink)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  async function getNextNotifications(nextPage: string) {
    if (!nextPage) return console.log('No more notifications')

    console.log('next page', nextPage)

    try {
      const response = await axios.post(nextPage)
      console.log(response)

      setNotifications([...notifications, ...response.data.notifications])
      setNextPage(response.data.nextLink)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  console.log(notifications)

  return (
    <Screen className='gap-20'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>Notification</h1>
        <p>Page content</p>
      </div>
      <Button onClick={getNotifications} title='Get Notifications'></Button>
      <Button onClick={createNotification} title='Create Notification'></Button>
      <Button onClick={() => getNextNotifications(nextPage)} title='Get Next Notifications'></Button>
    </Screen>
  )
}
