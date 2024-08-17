'use client'

import { Button, OutlineButton } from '@/components/Button'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import { Eye, GoalIcon, KeyRound, LogIn, Mail, Sparkles } from 'lucide-react'

export default function login() {
  return (
    <Screen className='justify-center gap-5 sm:gap-10'>
      <Hero />
      <div className='flex flex-col gap-6 px-1'>
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
      </div>
      <div>
        {/* <div>
          Start with 
        </div>
        <div>
          <GoalIcon className="text-white/70 " width={20} />
        </div> */}
      </div>
    </Screen>
  )
}
