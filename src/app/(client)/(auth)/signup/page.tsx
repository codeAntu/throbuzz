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
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

export default function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    password: '',
  })
  const [username, setUsername] = React.useState('')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  useEffect(() => {
    setError('')
  }, [user, username])

  async function onSignUp() {
    if (!user.name || !user.email || !username || !user.password) {
      setError('Please fill all the fields')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('/api/auth/signup', {
        name: user.name,
        email: user.email.toLowerCase(),
        username: username.toLowerCase(),
        password: user.password,
      })

      console.log('response', response.data.message)
      router.push('/verification')
    } catch (error: any) {
      console.log('error', error.response.data)
      setError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function checkUsername() {
    if (username.length < 3) {
      setIsUsernameAvailable(false)
      return
    }
    setIsUsernameChecking(true)

    try {
      const response = await axios.post('/api/auth/check-username', { username: username })
      if (await response.data.success) {
        setIsUsernameAvailable(true)
      } else {
        setIsUsernameAvailable(false)
      }
      console.log('response', response.data.success)
    } catch (error: any) {
      console.log('error', error.response.data)
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
            rightIcon={togglePasswordVisibility(hidePassword, setHidePassword, focusPassword)}
            value={user.password}
            onChange={(e: any) => {
              setUser({ ...user, password: e.target.value })
            }}
          />
          {error && <Error error={error} />}
        </div>
        <Button variant='accent' onClick={onSignUp} disabled={loading}>
          {loading ? (
            <Ic Icon={LoaderCircle} className='animate-spin text-white dark:text-black' />
          ) : (
            <Ic Icon={Sparkles} className='text-white dark:text-black' />
          )}
          <span>Create new account</span>
        </Button>
        <div className='text-center text-sm text-black/40 dark:text-white/40'>
          Already have an account?{' '}
          <button className='font-semibold text-accent' onClick={() => router.push('/login')}>
            Login
          </button>
        </div>
        <Continue />
        <TAndC />
      </div>
    </Screen>
  )
}
function togglePasswordVisibility(
  hidePassword: boolean,
  setHidePassword: React.Dispatch<React.SetStateAction<boolean>>,
  focusPassword: () => void,
): React.ReactNode {
  return hidePassword ? (
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
