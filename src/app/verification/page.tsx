'use client'

import { Button } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import OTPInput from '@/components/OTPInput'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import axios from 'axios'
import { KeyRound, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SetStateAction, useState } from 'react'
import { string } from 'zod'

export default function Verification() {
  const router = useRouter()
  const email = window.location.search.split('=')[1]
  console.log('email', email)
  const [otp, setOtp] = useState('')

  async function onVerify() {
    console.log('email', email)
    console.log('otp', otp)

    try {
      const response = await axios.post('/api/users/verification', { email, otp })

      if (response.data.success) {
        router.push('/login')
      }
      console.log('response', response.data.message)
    } catch (error: any) {
      console.log('error', error.response.data.error)
    }
  }

  console.log('otp mmmmm', otp)

  return (
    <Screen className='justify-center gap-12 pt-8'>
      <Hero />
      <div className='flex flex-col gap-7'>
        <div>
          <h1 className='text-center text-lg font-semibold text-black/70 dark:text-white/70'>Verify your email</h1>
          <p className='text-center text-xs text-black/40 dark:text-white/40'>
            We have sent an OTP to your email address
          </p>
        </div>

        <OTPInput length={6} getOTp={(otp: string) => setOtp(otp)} />

        <Button
          title='Verify'
          onClick={() => {
            onVerify()
          }}
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
