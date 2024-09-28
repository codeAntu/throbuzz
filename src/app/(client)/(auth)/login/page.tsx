'use client'

import { Button } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import axios from 'axios'
import { Eye, EyeOff, KeyRound, LoaderCircle, LogIn, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import Input from '@/components/Input'
import Error from '@/components/Error'
import useUserStore from '@/store/store'

export default function Login() {
  const router = useRouter()
  const savedUser = useUserStore((state) => state.savedUser)
  const setSavedUser = useUserStore((state) => state.setSavedUser)
  const [user, setUser] = useState({
    searchKey: '',
    password: '',
  })
  const passwordRef = useRef<HTMLInputElement>(null)
  const [hidePassword, setHidePassword] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError('')
  }, [user])

  async function onLogin() {
    if (!user.searchKey || !user.password) {
      setError('Please fill all the fields')
      return
    }
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login', user)
      console.log('response', response.data)
      setSavedUser(response.data.tokenData)

      router.push('/')
    } catch (error: any) {
      console.log('Login failed')
      console.log('error', error.response.data.error)
      setError(error.response.data.error)
    } finally {
      setLoading(false)
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
    <Screen className='justify-center gap-12 pt-8'>
      <Hero />
      <div className='flex flex-col gap-7'>
        <div className='flex flex-col items-center justify-center gap-3.5'>
          <Input
            type='text'
            name='email'
            placeholder='Enter your email address or username '
            leftIcon={<Ic Icon={Mail} />}
            value={user.searchKey}
            onChange={(e) => setUser({ ...user, searchKey: e.target.value })}
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
          {Error && <Error error={error} />}
        </div>
        <Button variant='accent' title='Login' onClick={() => onLogin()} disabled={loading}>
          {loading ? (
            <Ic Icon={LoaderCircle} className='animate-spin text-white dark:text-black' />
          ) : (
            <Ic Icon={LogIn} className='text-white dark:text-black' />
          )}
          <span>Login</span>
        </Button>
        <div className='text-center text-sm text-black/40 dark:text-white/40'>
          Do not have an account?{'  '}
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
function togglePasswordVisibility(
  hidePassword: boolean,
  setHidePassword: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  focusPassword: () => void,
) {
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
