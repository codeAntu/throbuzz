'use client'

import { Button, OutlineButton } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import { Eye, KeyRound, LogIn, Mail, Sparkles } from 'lucide-react'

export default function login() {
  return (
    <Screen className='justify-center gap-14 pt-8'>
      <Hero />
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <Input type='email' name='email' placeholder='Enter your email address' leftIcon={<Ic Icon={Mail} />} />
          <Input
            type='password'
            name='password'
            placeholder='Enter your password'
            leftIcon={<Ic Icon={KeyRound} />}
            rightIcon={<Ic Icon={Eye} />}
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-4'>
          <Button
            title='Login'
            onClick={() => console.log('Login')}
            className={'w-full bg-transparent'}
            leftIcon={<LogIn className='' width={20} />}
          />
          <OutlineButton
            title='Create new account'
            onClick={() => console.log('Create new password')}
            className='w-full'
            leftIcon={<Ic Icon={Sparkles} className='text-black dark:text-white' />}
          />
        </div>
        <div>
          <Continue />
        </div>
      </div>
    </Screen>
  )
}
