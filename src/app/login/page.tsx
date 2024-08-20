'use client'

import { Button, OutlineButton } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import { Eye, KeyRound, LogIn, Mail, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  return (
    <Screen className='justify-center gap-12 pt-8'>
      <Hero />
      <div className='flex flex-col gap-7'>
        <div className='flex flex-col items-center justify-center gap-3.5'>
          <Input type='email' name='email' placeholder='Enter your email address' leftIcon={<Ic Icon={Mail} />} />
          <Input
            type='password'
            name='password'
            placeholder='Enter your password'
            leftIcon={<Ic Icon={KeyRound} />}
            rightIcon={<Ic Icon={Eye} />}
          />
        </div>
        <Button
          title='Login'
          onClick={() => console.log('Login')}
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
