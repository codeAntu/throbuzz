'use client'

import { Button } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import axios from 'axios'
import { Eye, EyeOff, KeyRound, LogIn, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import jwt from 'jsonwebtoken'
import Input from '@/components/Input'

export default function Login() {
  const router = useRouter()

  const [user, setUser] = useState({
    searchKey: '',
    password: '',
  })
  const passwordRef = useRef<HTMLInputElement>(null)
  const [hidePassword, setHidePassword] = useState(true)

  async function onLogin() {
    try {
      const response = await axios.post('/api/users/login', user)
      console.log('response', response.data)

      const token = response.data.tokenData
      console.log('token', token)
      router.push('/')
    } catch (error: any) {
      console.log('Login failed')
      console.log('error', error.response.data.error)
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
        </div>
        <Button
          title='Login'
          onClick={() => onLogin()}
          leftIcon={<Ic Icon={LogIn} className='text-white dark:text-black' />}
        />
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
