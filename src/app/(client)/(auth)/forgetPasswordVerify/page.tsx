'use client'

import { Button } from '@/components/Button'
import Error from '@/components/Error'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import OTPInput from '@/components/OTPInput'
import { Screen } from '@/components/Screen'
import { togglePasswordVisibility } from '@/components/TogglePasswordVisibility'
import useUserStore from '@/store/store'
import axios from 'axios'
import { KeyRound, LoaderCircle, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function Verification() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const setSavedUser = useUserStore((state: any) => state.setSavedUser)
  const [hidePassword, setHidePassword] = useState(true)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleForgetPasswordVerify() {
    if (!otp || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError('')
    setLoading(true)

    const response = await forgetPasswordVerify({
      otp: otp,
      password: password,
      confirmPassword: confirmPassword,
    })

    if (response.status === 200) {
      router.push('/')
    } else {
      setError(response.data.error)
    }
    setLoading(false)
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
    <Screen className='gap-12 pt-12'>
      <div className='flex flex-col items-center gap-7 py-10 md:gap-12'>
        <div>
          <h1 className='text-center text-lg font-semibold text-black/70 dark:text-white/70'>Verify your email</h1>
        </div>
        <div className='w-full max-w-[600px] flex-grow'>
          <OTPInput length={6} getOTp={(otp: string) => setOtp(otp)} />
        </div>
        <Input
          ref={passwordRef}
          type={hidePassword ? 'password' : 'text'}
          name='password'
          placeholder='Enter your password'
          leftIcon={<Ic Icon={KeyRound} />}
          rightIcon={togglePasswordVisibility(hidePassword, setHidePassword, focusPassword)}
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value)
          }}
        />
        <Input
          ref={passwordRef}
          type={hidePassword ? 'password' : 'text'}
          name='password'
          placeholder='Enter your password again'
          leftIcon={<Ic Icon={KeyRound} />}
          rightIcon={togglePasswordVisibility(hidePassword, setHidePassword, focusPassword)}
          value={confirmPassword}
          onChange={(e: any) => {
            setConfirmPassword(e.target.value)
          }}
        />

        {error && <Error error={error} />}

        <Button
          title='Verify'
          onClick={() => {
            handleForgetPasswordVerify()
          }}
          disabled={loading}
        >
          {loading ? (
            <Ic Icon={LoaderCircle} className='animate-spin text-white dark:text-black' />
          ) : (
            <Ic Icon={LogIn} className='text-white dark:text-black' />
          )}
          <span className=''>Verify</span>
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
      </div>
    </Screen>
  )
}

async function forgetPasswordVerify({
  otp,
  password,
  confirmPassword,
}: {
  otp: string
  password: string
  confirmPassword: string
}) {
  try {
    const response = await axios.post('/api/auth/forgetPasswordVerify', {
      OTP: otp,
      newPassword: password,
      confirmPassword: password,
    })
    return response
  } catch (error: any) {
    return error.response
  }
}
