'use client'

import { User } from 'lucide-react'
import { Button } from './Button'

export default function GustUser() {
  return (
    <Button className='py-2.5 font-normal shadow-lg shadow-accent/50 ring ring-accent/30 transition-all duration-300'>
      <User size={20} className='mr-1' />
      Login as Guest
    </Button>
  )
}
