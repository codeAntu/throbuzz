'use client'
import { Button } from '@/components/Button'
import Continue from '@/components/Continue'
import Error from '@/components/Error'
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
    name: '',
    email: '',
    username: '',
    password: '',
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  function showErrors(error: string) {
    setError(error)
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  async function onSignUp() {
    console.log(user)
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)

      if (response.data.title === 'User created successfully') {
        console.log('User created successfully')
      }
      console.log('response', response.data.message)
    } catch (error: any) {
      router.push('/verification?' + user.email)
      console.log('signUp failed')
      console.log('error', error.response.data.error)

      showErrors(error.response.data.error)
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
            value={user.username}
            onChange={(e: any) => {
              setUser({ ...user, username: e.target.value })
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
        {error && <Error error={error} />}
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
