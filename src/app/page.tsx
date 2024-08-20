'use client'

import { Button, OutlineButton } from '@/components/Button'
import Continue from '@/components/Continue'
import Hero from '@/components/Hero'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import TAndC from '@/components/T&C'
import { AtSign, Eye, KeyRound, LogIn, Mail, Sparkles, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <Screen className='justify-center gap-10 pt-10'>
      <Hero />

      <Button onClick={() => router.push('/profile/AnantaKarmakar')} leftIcon={<Ic Icon={LogIn} />}>
        {' '}
        Profile
      </Button>

      <div className='flex flex-col gap-5'>
        <div className='flex flex-col items-center justify-center gap-2.5'>
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
        <Button
          title='Create new account'
          onClick={() => console.log('Login')}
          leftIcon={<Ic Icon={Sparkles} className='text-white dark:text-black' />}
        />

        <div className='text-center text-sm text-black/40 dark:text-white/40'>
          Already have an account?{' '}
          <a href='/' className='font-semibold text-accent'>
            Login
          </a>
        </div>
        <Continue />
        <TAndC />
      </div>
    </Screen>
  )
}
