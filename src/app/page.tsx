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

export default function Home() {
  const router = useRouter()

  async function onLogOut() {
    try {
      const response = await axios.post('/api/users/logout')

      console.log('response', response.data.message)

      router.push('/login')
    } catch (error) {}
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

      <Button title='logout' onClick={onLogOut} leftIcon={<Ic Icon={LogIn} />}>
        {' '}
        Logout
      </Button>
    </Screen>
  )
}
