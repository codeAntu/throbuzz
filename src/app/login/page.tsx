'use client'

import { Button, OutlineButton } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import axios from 'axios'
import { Eye, KeyRound, LogIn, Mail, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()

  const [user, setUser] = useState({
    searchKey: '',
    password: '',
  })

  async function onLogin() {
    console.log(user)

    try {
      const response = await axios.post('/api/users/login', user)
      console.log('Login successful')

      console.log('response', response.data.message)
    } catch (error: any) {
      console.log('Login failed')
      console.log('error', error.response.data.message)
    }
  }

  return (
    <Screen className='justify-center gap-12 pt-8'>
      <Hero />
      <div className='flex flex-col gap-7'>
        <div className='flex flex-col items-center justify-center gap-3.5'>
          <Input
            type='email'
            name='email'
            placeholder='Enter your email address or username '
            leftIcon={<Ic Icon={Mail} />}
            value={user.searchKey}
            onChange={(e) => setUser({ ...user, searchKey: e.target.value })}
          />
          <Input
            type='password'
            name='password'
            placeholder='Enter your password'
            leftIcon={<Ic Icon={KeyRound} />}
            rightIcon={<Ic Icon={Eye} />}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <Button
          title='Login'
          onClick={() => onLogin()}
          leftIcon={<Ic Icon={LogIn} className='text-white dark:text-black' />}
        />
        <div className='text-center text-sm text-black/40 dark:text-white/40'>
          Don't have an account?{'  '}
          <button
            onClick={() => {
              router.push('/signup')
            }}
            className='font-semibold text-accent'
          >
            Sign up
          </button>
        </div>
        <Continue />
        <TAndC />
      </div>
    </Screen>
  )
}
