'use client'

import { Button, OutlineButton } from '@/components/Button'
import Hero from '@/components/Hero'
import Input from '@/components/Input'
import { Eye, GoalIcon, KeyRound, LogIn, Mail } from 'lucide-react'

export default function login() {
  return (
    <div className='flex h-[100dvh] w-full flex-col justify-center p-5'>
      <Hero />
      <div className='flex flex-col gap-5 px-1'>
        <Input
          type='email'
          name='email'
          className='w-full'
          placeholder='Enter your email address'
          leftIcon={<Mail className='text-white/70' width={20} />}
        />
        <Input
          type='password'
          name='password'
          className='w-full'
          placeholder='Enter your password'
          leftIcon={<KeyRound className='text-white/70' width={20} />}
          rightIcon={<Eye className='text-white/70' width={20} />}
        />
        <Button
          title='Login'
          onClick={() => console.log('Login')}
          disabled={false}
          className={'w-full bg-transparent'}
          leftIcon={<LogIn className='text-black/70' width={20} />}
        />
        <OutlineButton title='Create new account' onClick={() => console.log('Create new password')} disabled={false} className='w-full' />
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
  )
}
