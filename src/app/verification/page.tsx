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
import { string } from 'zod'

export default function Verification() {
  const router = useRouter()
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const email = window.location.search.split('=')[1]
  console.log('email', email)

  async function onVerify() {
    try {
      const response = await axios.post('/api/users/verification', { email, otp })

      console.log('response', response.data.message)
    } catch (error: any) {
      console.log('error', error.response.data.error)
    }
  }

  console.log('otp', otp)

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

        {/* <div className='flex flex-col items-center justify-center gap-3.5'>
          <Input
            type='number'
            name='otp'
            placeholder='Enter your otp'
            leftIcon={<Ic Icon={KeyRound} />}
            value={otp}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setOtp(e.target.value)}
          />
        </div> */}

        <div>
          {otp.map((data, i) => (
            <input
              key={i}
              type='text'
              maxLength={1}
              value={data}
              className='h-12 w-12 rounded-md border border-black/10 text-center text-2xl font-semibold dark:border-white/10'
              onChange={(e) => {
                // i also want to overwrite the value in the array

                const value = e.target.value
                const otpCopy = [...otp]
                otpCopy[i] = value
                setOtp(otpCopy)

                // if value.length is 1, move to next input
                // if value.length is 0, move to previous input

                if (e.target.value.length === 1 && i !== otp.length - 1) {
                  ;(e.target.nextElementSibling as HTMLInputElement | null)?.focus()
                }
              }}
            />
          ))}
        </div>

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
