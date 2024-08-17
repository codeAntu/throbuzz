'use client'

import { Button, OutlineButton } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import { AtSign, Eye, KeyRound, LogIn, Mail, Sparkles, User } from 'lucide-react'

export default function Home() {
  return (
    <Screen className='justify-center gap-10'>
      <Hero />
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center justify-center gap-3'>
          <Input type='text' name='name' placeholder='Enter your name' leftIcon={<Ic Icon={User} />} />
          <Input type='email' name='email' placeholder='Enter your email address' leftIcon={<Ic Icon={Mail} />} />
          <Input type='text' name='userName' placeholder='Choose a user name' leftIcon={<Ic Icon={AtSign} />} />
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
            title='Create new account'
            onClick={() => console.log('Login')}
            className={'w-full bg-transparent'}
            leftIcon={<Ic Icon={Sparkles} className='text-white dark:text-black' />}
          />
          <OutlineButton
            title='Login'
            onClick={() => console.log('Create new password')}
            className='w-full'
            leftIcon={<LogIn className='' width={20} />}
          />
        </div>
        <div>
          <Continue />
        </div>
        <TAndC />
      </div>
    </Screen>
  )
}
