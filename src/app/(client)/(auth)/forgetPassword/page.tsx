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
import { LoaderCircle, LogIn, Mail, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function ForgetPasswordPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    searchKey: '',
    password: '',
  })
  const passwordRef = useRef<HTMLInputElement>(null)
  const [hidePassword, setHidePassword] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  async function forgetPassword() {
    try {
      const response = await axios.post('/api/auth/forgetPassword', {
        searchKey: 'codeAntu@gmail.com',
      })

      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function forgetPasswordVerify() {
    try {
      const response = await axios.post('/api/auth/forgetPasswordVerify', {
        OTP: '411714',
        newPassword: password,
        confirmPassword: password,
      })

      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function updatePassword() {
    try {
      const response = await axios.post('/api/auth/updatePassword', {
        password: password,
        newPassword: 'asdfghjk',
        confirmPassword: 'asdfghjk',
      })

      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Screen className='justify-normal gap-12 pt-24'>
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
        </div>

        <Button variant='accent' title='Login' disabled={loading}>
          {loading ? (
            <Ic Icon={LoaderCircle} className='animate-spin text-white dark:text-black' />
          ) : (
            <Ic Icon={Search} className='text-white dark:text-black' />
          )}
          <span>Search</span>
        </Button>
        {error && <Error error={error} />}

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
      </div>
    </Screen>
  )
}
