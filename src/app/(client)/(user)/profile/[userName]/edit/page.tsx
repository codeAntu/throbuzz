'use client'
import { Button } from '@/components/Button'
import Error from '@/components/Error'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { AtSign, Check, LoaderCircle, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Edit() {
  const [user, setUser] = useState({
    name: '',
    bio: '',
    about: '',
  })

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)
  const [isUsernameChecking, setIsUsernameChecking] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkUsername()
    }, 300)
    return () => clearTimeout(timeout)
  }, [username])

  useEffect(() => {
    setError('')
  }, [user, username])

  async function checkUsername() {
    if (username.length < 3) {
      setIsUsernameAvailable(false)
      return
    }
    setIsUsernameChecking(true)

    try {
      const response = await axios.post('/api/auth/check-username', { username: username })
      if (await response.data.success) {
        setIsUsernameAvailable(true)
      } else {
        setIsUsernameAvailable(false)
      }
      console.log('response', response.data.success)
    } catch (error: any) {
      console.log('error', error.response.data)
    } finally {
      setIsUsernameChecking(false)
    }
  }

  async function updateUser() {
    if (username.length < 3) {
      setError('Username must be atleast 3 characters long')
      return
    }

    if (!isUsernameAvailable) {
      setError('Username is already taken')
      return
    }

    if (user.name.length < 3) {
      setError('Name must be atleast 3 characters long')
      return
    }

    console.log('user', user)
    console.log('username', username)

    try {
      const response = await axios.post('/api/user/updateUser', {
        name: user.name,
        username: username,
        bio: user.bio,
        about: user.about,
      })
      console.log('response', response.data.success)
    } catch (error: any) {
      console.log('error', error.response.data)
    }
  }

  async function getUser() {
    try {
      const response = await axios.post('/api/user/getUser', { username })
      console.log('response', response)
    } catch (error: any) {
      console.log('error', error.response.data)
    }
  }

  return (
    <Screen className='flex'>
      <div className='grid gap-8'>
        <div className='flex w-full text-center text-xl'>Edit Profile</div>
        <div>
          <div className='flex flex-col justify-center gap-2.5'>
            <div>
              <div className='px-1.5 text-lg font-medium text-black/60 dark:text-white/60'>Name</div>
              <Input
                type='text'
                name='name'
                placeholder='Enter your name'
                leftIcon={<Ic Icon={User} />}
                value={user.name}
                onChange={(e: any) => {
                  setUser({ ...user, name: e.target.value })
                }}
              />
            </div>
            <div>
              <div className='px-1.5 text-lg font-medium text-black/60 dark:text-white/60'>UserName</div>

              <Input
                type='text'
                name='userName'
                placeholder='Choose a user name'
                leftIcon={<Ic Icon={AtSign} />}
                rightIcon={
                  isUsernameChecking ? (
                    <Ic Icon={LoaderCircle} className='animate-spin' />
                  ) : isUsernameAvailable ? (
                    <Ic Icon={Check} className='text-green-500' />
                  ) : (
                    username.length > 3 && <Ic Icon={X} className='text-red-500' />
                  )
                }
                value={username}
                onChange={(e: any) => {
                  setUsername(e.target.value)
                }}
              />
            </div>
            <div>
              <div className='px-1.5 text-lg font-medium text-black/60 dark:text-white/60'>Bio</div>
              <textarea
                className='h-36 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-4 text-sm font-medium text-black outline-none dark:border-white/10 dark:bg-white/5 dark:text-white'
                name='bio'
                placeholder='Enter your bio'
                // leftIcon={<Ic Icon={User} />}
                value={user.bio}
                onChange={(e: any) => {
                  setUser({ ...user, bio: e.target.value })
                }}
              />
            </div>
            <div>
              <div className='px-1.5 text-lg font-medium text-black/60 dark:text-white/60'>About</div>
              <textarea
                className='h-36 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-4 text-sm font-medium text-black outline-none dark:border-white/10 dark:bg-white/5 dark:text-white'
                name='about'
                placeholder='Enter about yourself'
                // leftIcon={<Ic Icon={User} />}
                value={user.about}
                onChange={(e: any) => {
                  setUser({ ...user, about: e.target.value })
                }}
              />
            </div>

            {error && <Error error={error} />}
          </div>
        </div>
        <Button title='Save' className='w-full' onClick={() => updateUser()}>
          Save
        </Button>

        <Button title='Get User' className='w-full' onClick={() => getUser()}>
          Get User
        </Button>
      </div>
    </Screen>
  )
}
