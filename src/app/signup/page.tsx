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
import { AtSign, Check, Eye, EyeOff, KeyRound, LoaderCircle, Mail, Sparkles, User, X } from 'lucide-react'
import { set } from 'mongoose'
import { useRouter } from 'next/navigation'
import React, { forwardRef, use, useEffect, useRef } from 'react'

export default function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    password: '',
  })
  const [username, setUsername] = React.useState('')
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [isUsernameAvailable, setIsUsernameAvailable] = React.useState(false)
  const [isUsernameChecking, setIsUsernameChecking] = React.useState(false)
  const [hidePassword, setHidePassword] = React.useState(true)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkUsername()
    }, 300)
    return () => clearTimeout(timeout)
  }, [username])

  useEffect(() => {
    setError('')
  }, [user])

  function showErrors(error: string) {
    setError(error)
  }

  async function onSignUp() {
    if (!user.name || !user.email || !username || !user.password) {
      showErrors('All fields are required')
      return
    }

    console.log(user)
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', {
        name: user.name,
        email: user.email.toLowerCase(),
        username: username.toLowerCase(),
        password: user.password,
      })
      if (response.data.title === 'User created successfully') {
        console.log('User created successfully')
      }
      router.push('/verification?' + user.email)
      console.log('response', response.data.message)
    } catch (error: any) {
      console.log('signUp failed')
      console.log('error', error.response.data.error)

      showErrors(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  async function checkUsername() {
    if (username.length < 3) {
      setIsUsernameAvailable(false)
      return
    }
    setIsUsernameChecking(true)
    console.log('checking username', username)

    try {
      const response = await axios.post('/api/users/check-username', { username: username })
      if (await response.data) {
        setIsUsernameAvailable(true)
      } else {
        setIsUsernameAvailable(false)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsUsernameChecking(false)
    }
  }

  function focusPassword() {
    const input = passwordRef.current
    if (input) {
      input.focus()
      setTimeout(() => {
        const len = input.value.length
        console.log('len', len)
        input.setSelectionRange(len, len)
      }, 0)
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
            rightIcon={
              isUsernameChecking ? (
                <Ic Icon={LoaderCircle} className='animate-spin' />
              ) : isUsernameAvailable ? (
                <Ic Icon={Check} className='text-green-500' />
              ) : (
                username.length > 3 && <Ic Icon={X} className='text-red-500' />
              )
            }
            value={username}
            onChange={(e: any) => {
              setUsername(e.target.value)
            }}
          />
          <Input
            ref={passwordRef}
            type={hidePassword ? 'password' : 'text'}
            name='password'
            placeholder='Enter your password'
            leftIcon={<Ic Icon={KeyRound} />}
            rightIcon={
              hidePassword ? (
                <Ic
                  Icon={Eye}
                  onClick={() => {
                    setHidePassword(false)
                    focusPassword()
                  }}
                  className='cursor-pointer'
                />
              ) : (
                <Ic
                  Icon={EyeOff}
                  onClick={() => {
                    setHidePassword(true)
                    focusPassword()
                  }}
                  className='cursor-pointer'
                />
              )
            }
            value={user.password}
            onChange={(e: any) => {
              setUser({ ...user, password: e.target.value })
            }}
          />
          {error && <Error error={error} />}
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
