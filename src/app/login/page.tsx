'use client'

import { Button, OutlineButton } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import { Eye, KeyRound, LogIn, Mail, Sparkles } from 'lucide-react'

export default function login() {
  return (
    <Screen className='justify-center gap-14 pt-8'>
      <Hero />
      <div className='flex flex-col gap-6'>
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
        <div className='flex flex-col items-center justify-center gap-3.5'>
          <Button
            title='Login'
            onClick={() => console.log('Login')}
            leftIcon={<Ic Icon={LogIn} className='text-white dark:text-black' />}
          />
          <OutlineButton
            title='Create new account'
            onClick={() => console.log('Create new password')}
            leftIcon={<Ic Icon={Sparkles} className='text-black/70 dark:text-white/70' />}
          />
        </div>
        <Continue />
        <TAndC />
      </div>
    </Screen>
  )
}
