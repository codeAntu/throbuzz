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
import jwt from 'jsonwebtoken'

export default function Home() {
  const router = useRouter()

  return (
    <Screen className='justify-center gap-10 pt-10'>
      <Hero />

      <Button onClick={() => router.push('/profile/AnantaKarmakar')} leftIcon={<Ic Icon={LogIn} />}>
        {' '}
        Profile
      </Button>

      <div>Home</div>
    </Screen>
  )
}
