'use client'

import { Button } from '@/components/Button'
import SimpleDrawer from '@/components/Drawer'
import Drawer from '@/components/Drawer'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Popup from '@/components/Popup'
import { Screen } from '@/components/Screen'
import useStore from '@/store/store'
import axios from 'axios'
import { LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const savedUser = useStore((state) => state.savedUser)
  const clearSavedUser = useStore((state) => state.clearSavedUser)

  async function onLogOut() {
    try {
      const response = await axios.post('/api/auth/logout')

      console.log('response', response.data.message)
      clearSavedUser()
      router.push('/login')
    } catch (error) {}
  }

  async function sendFriendRequest() {
    try {
      const response = await axios.post('/api/user/sendFriendRequest', {
        username: 'codeantu',
      })

      console.log('response', response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Screen className='justify-center gap-10 pt-10'>
      <Hero />
      <Button
        title='Go to Profile'
        onClick={() => router.push('/profile/')}
        leftIcon={<Ic Icon={LogIn} />}
        className=''
      >
        Profile
      </Button>
      <Button
        title='logout'
        onClick={() => {
          onLogOut()
        }}
        leftIcon={<Ic Icon={LogIn} />}
      >
        {' '}
        Logout
      </Button>
      <Button
        title='send friend request'
        onClick={() => {
          sendFriendRequest()
        }}
        leftIcon={<Ic Icon={LogIn} />}
      />

      {/* <Drawer /> */}
      <Popup
        button={
          <span
            title='Open Drawer'
            onClick={() => {
              console.log('clicked ')
            }}
          >
            Open Drawer
          </span>
        }
      >
        <div className='border-2'>Text</div>
      </Popup>

      <SimpleDrawer />
    </Screen>
  )
}
