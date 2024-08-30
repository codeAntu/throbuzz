'use client'

import { Button, OutlineButton } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import { AtSign, Eye, KeyRound, LogIn, Mail, Sparkles, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import useStore from '@/store/store'

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

  async function getImg() {
    try {
      const response = await axios.get('/api/temp/get-img')

      console.log('response', response.data.url)
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
        title='Get Image'
        onClick={() => {
          getImg()
        }}
        leftIcon={<Ic Icon={LogIn} />}
      >
        {' '}
        Get Image
      </Button>
      {/* <CldImage width='960' height='600' src='<Public ID>' sizes='100vw' alt='Description of my image' /> */}
      Expand
    </Screen>
  )
}
