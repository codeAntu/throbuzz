'use client'

import { Button } from '@/components/Button'
import Error from '@/components/Error'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import OTPInput from '@/components/OTPInput'
import { Screen } from '@/components/Screen'
import useUserStore from '@/store/store'
import axios from 'axios'
import { LoaderCircle, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Verification() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const setSavedUser = useUserStore((state: any) => state.setSavedUser)

  async function onVerify(): Promise<void> {
    if (!otp) {
      setError('Please fill all the fields')
      return
    }
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/verification', { otp })
      console.log('response', response.data.message)
      setSavedUser(response.data.user)
      router.push('/')
    } catch (error: any) {
      console.log('error', error.response.data.error)
    }
    setLoading(false)
  }

  return (
    <Screen className='gap-12 pt-12'>
      <Hero />
      <div className='flex flex-col gap-7 py-10 md:gap-12'>
        <div>
          <h1 className='text-center text-lg font-semibold text-black/70 dark:text-white/70'>Verify your email</h1>
          <p className='text-center text-xs text-black/40 dark:text-white/40'>
            We have sent an OTP to your email address .
          </p>
        </div>
        <div className=''>
          <OTPInput length={6} getOTp={(otp: string) => setOtp(otp)} />
        </div>

        {error && <Error error={error} />}

        <Button
          title='Verify'
          onClick={() => {
            onVerify()
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
        {/* <Continue /> */}
        {/* <TAndC /> */}
      </div>
    </Screen>
  )
}
