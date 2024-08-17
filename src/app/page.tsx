'use client'

import { Button } from '@/components/Button'
import Input from '@/components/Input'

export default function Home() {
  return (
    <div className='flex w-full justify-center'>
      <div className='flex h-[100dvh] w-[600px] flex-col items-center justify-center gap-10 border'>
        <Button title='Sign Up' onClick={() => console.log('Sign Up')} disabled={false} />
        <Input label='Email' type='email' name='email' className='w-full' />
      </div>
    </div>
  )
}
