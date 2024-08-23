'use client'
import { Button } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import axios from 'axios'
import { AtSign, Eye, KeyRound, Mail, Sparkles, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    name: 'Ananta',
    email: 'one10@gmail.com',
    userName: 'antu',
    password: 'ekjfbEHJb',
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  // useEffect(() => {
  //   if (user.name && user.email && user.password) {
  //     setButtonDisabled(false)
  //   } else {
  //     setButtonDisabled(true)
  //   }
  // }, [user])

  async function onSignUp() {
    console.log(user)

    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('signUp successful')

      console.log('response', response.data.message)
      // router.push("/login");
    } catch (error: any) {
      console.log('signUp failed')
      console.log('error', error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen className='justify-center gap-10 pt-10'>
      <Hero />
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col items-center justify-center gap-2.5'>
          <Input
            type='text'
            name='name'
            placeholder='Enter your name'
            leftIcon={<Ic Icon={User} />}
            value={user.name}
            onChange={(e: any) => {
              setUser({ ...user, name: e.target.value })
            }}
          />
          <Input
            type='email'
            name='email'
            placeholder='Enter your email address'
            leftIcon={<Ic Icon={Mail} />}
            value={user.email}
            onChange={(e: any) => {
              setUser({ ...user, email: e.target.value })
            }}
          />
          <Input
            type='text'
            name='userName'
            placeholder='Choose a user name'
            leftIcon={<Ic Icon={AtSign} />}
            value={user.userName}
            onChange={(e: any) => {
              setUser({ ...user, userName: e.target.value })
            }}
          />
          <Input
            type='password'
            name='password'
            placeholder='Enter your password'
            leftIcon={<Ic Icon={KeyRound} />}
            rightIcon={<Ic Icon={Eye} />}
            value={user.password}
            onChange={(e: any) => {
              setUser({ ...user, password: e.target.value })
            }}
          />
        </div>
        <Button
          title='Create new account'
          onClick={() => {
            console.log('signing up')
            onSignUp()
          }}
          leftIcon={<Ic Icon={Sparkles} className='text-white dark:text-black' />}
        />
        <div className='text-center text-sm text-black/40 dark:text-white/40'>
          Already have an account?{' '}
          <button className='font-semibold text-accent' onClick={() => router.push('/login')}>
            Login
          </button>
        </div>
        z
        <Continue />
        <TAndC />
      </div>
    </Screen>
  )
}
