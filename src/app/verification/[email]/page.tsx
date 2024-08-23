'use client'

import { Button } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import axios from 'axios'
import { KeyRound, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SetStateAction, useState } from 'react'

export default function Verification({ email }: { email: string }) {
  const router = useRouter()
  const [otp, setOtp] = useState<string>('491787')

  async function onVerify() {
    try {
      const response = await axios.post('/api/users/verification', { email, otp })

      console.log('response', response.data.message)
    } catch (error: any) {
      console.log('error', error.response.data.error)
    }
  }

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

        <div className='flex flex-col items-center justify-center gap-3.5'>
          <Input
            type='number'
            name='otp'
            placeholder='Enter your otp'
            leftIcon={<Ic Icon={KeyRound} />}
            value={otp}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setOtp(e.target.value)}
          />
        </div>

        <Button
          title='Verify'
          onClick={() => {
            onVerify()
          }}
          leftIcon={<Ic Icon={LogIn} className='text-white dark:text-black' />}
        />
        <div className='text-center text-sm text-black/40 dark:text-white/40'>
          Don't have an account?{'  '}
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
