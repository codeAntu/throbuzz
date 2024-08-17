'use client'

import { Button, OutlineButton } from '@/components/Button'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import { Eye, GoalIcon, KeyRound, LogIn, Mail } from 'lucide-react'

export default function login() {
  return (
    <Screen className='items-center justify-center gap-4'>
      <div className=''>
        <Hero />
        <div className='flex flex-col gap-5 px-1'>
          <Input type='email' name='email' placeholder='Enter your email address' leftIcon={<Ic Icon={Mail} />} />
          <Input
            type='password'
            name='password'
            placeholder='Enter your password'
            leftIcon={<KeyRound className='' width={20} />}
            rightIcon={<Eye className=' ' width={20} />}
          />
          <Button
            title='Login'
            onClick={() => console.log('Login')}
            disabled={false}
            className={'w-full bg-transparent'}
            leftIcon={<LogIn className='' width={20} />}
          />
          <OutlineButton
            title='Create new account'
            onClick={() => console.log('Create new password')}
            disabled={false}
            className='w-full'
          />
        </div>
        <div>
          {/* <div>
          Start with 
        </div>
        <div>
          <GoalIcon className="text-white/70 " width={20} />
        </div> */}
        </div>
      </div>
    </Screen>
  )
}
