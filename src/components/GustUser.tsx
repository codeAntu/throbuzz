'use client'

import axios from 'axios'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './Button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'

export default function GustUser() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    searchKey: 'guest',
    password: '12345678',
  })

  // Function to save user data (you'll need to implement this based on your store)
  const setSavedUser = (userData: any) => {
    // Implement based on your user store/context
    localStorage.setItem('user', JSON.stringify(userData))
  }
  async function onLogin() {
    if (!user.searchKey || !user.password) {
      setError('Please fill all the fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('/api/auth/login', user)
      console.log('response', response.data)
      setSavedUser(response.data.user)

      // Check if already on home page, if so refresh, otherwise navigate
      if (window.location.pathname === '/') {
        window.location.reload()
      } else {
        router.push('/')
      }
    } catch (error: any) {
      console.log('Login failed')
      console.log('error', error.response?.data?.error)
      setError(error.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger className='group w-full'>
        <Button className='h-12 w-full transform bg-gradient-to-r from-accent to-primary text-base font-medium shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-accent/90 hover:to-primary/90 hover:shadow-xl'>
          <User size={22} className='mr-2 transition-transform duration-300 group-hover:rotate-12' />
          Login as Guest
        </Button>
      </DrawerTrigger>
      <DrawerContent className='mx-auto w-[97%] max-w-[800px] rounded-3xl backdrop-blur-3xl transition duration-300'>
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5' />
        <DrawerHeader className='relative space-y-4 text-center'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary shadow-lg'>
            <User size={28} className='text-white' />
          </div>
          <DrawerTitle className='bg-gradient-to-r from-accent to-primary bg-clip-text text-center text-2xl font-bold text-transparent'>
            Welcome, Guest!
          </DrawerTitle>
          <DrawerDescription className='mx-auto max-w-sm text-base leading-relaxed text-muted-foreground'>
            Jump right in and explore everything our platform has to offer. As a guest, you will have access to:
          </DrawerDescription>
          <div className='mt-6 grid grid-cols-2 gap-3 text-sm'>
            <div className='flex items-center space-x-2 rounded-lg border border-accent/20 bg-accent/10 p-3'>
              <div className='h-2 w-2 rounded-full bg-accent' />
              <span className='font-medium'>Create Posts</span>
            </div>
            <div className='flex items-center space-x-2 rounded-lg border border-primary/20 bg-primary/10 p-3'>
              <div className='h-2 w-2 rounded-full bg-primary' />
              <span className='font-medium'>Like & Comment</span>
            </div>
            <div className='flex items-center space-x-2 rounded-lg border border-accent/20 bg-accent/10 p-3'>
              <div className='h-2 w-2 rounded-full bg-accent' />
              <span className='font-medium'>Follow Users</span>
            </div>
            <div className='flex items-center space-x-2 rounded-lg border border-primary/20 bg-primary/10 p-3'>
              <div className='h-2 w-2 rounded-full bg-primary' />
              <span className='font-medium'>Edit Profile</span>
            </div>{' '}
          </div>
        </DrawerHeader>{' '}
        <DrawerFooter className='relative space-y-3'>
          {error && (
            <div className='rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-500'>
              {error}
            </div>
          )}
          <Button
            onClick={onLogin}
            disabled={loading}
            className='h-12 w-full transform bg-gradient-to-r from-accent to-primary text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-accent/90 hover:to-primary/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50'
          >
            {loading ? 'Logging in...' : 'Continue as Guest'}
          </Button>
          <DrawerClose className='w-full'>
            <Button variant='outline' className='h-11 w-full border-2 transition-all duration-200 hover:bg-muted/50'>
              Maybe Later
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
