'use client'
import { Button } from '@/components/Button'
import Error from '@/components/Error'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { AtSign, Check, LoaderCircle, LogIn, User, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Edit() {
  const [user, setUser] = useState({
    name: '',
    bio: '',
    about: '',
    username: '',
  })

  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    bio: '',
    about: '',
    username: '',
  })

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)
  const [isUsernameChecking, setIsUsernameChecking] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkUsername()
    }, 300)
    return () => clearTimeout(timeout)
  }, [username])

  useEffect(() => {
    setError('')
  }, [updatedUser, username])

  useEffect(() => {
    getMe()
  }, [])

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
    } catch (error: any) {
      console.log('error', error.response.data)
    } finally {
      setIsUsernameChecking(false)
    }
  }

  async function updateUser() {
    if (!updatedUser.name || !updatedUser.username) {
      setError('Name and Username are required')
      return
    }

    if (
      updatedUser.name === user.name &&
      updatedUser.username === user.username &&
      updatedUser.bio === user.bio &&
      updatedUser.about === user.about
    ) {
      setError('No changes made')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post('/api/user/updateUser', {
        name: updatedUser.name,
        username: username,
        bio: updatedUser.bio,
        about: updatedUser.about,
      })
      console.log('response', response.data)
      router.push(`/profile/${username}`)
    } catch (error: any) {
      console.log('error', error.response.data)
    }
    setLoading(false)
  }

  async function getMe() {
    try {
      const response = await axios.get('/api/user/me')

      setUser({
        name: response.data.user.name,
        bio: response.data.user.bio,
        about: response.data.user.about,
        username: response.data.user.username,
      })

      setUsername(response.data.user.username)
      setUpdatedUser({
        name: response.data.user.name,
        bio: response.data.user.bio,
        about: response.data.user.about,
        username: response.data.user.username,
      })
    } catch (error: any) {
      console.log('error', error.response.data)
    }
  }

  console.log('updatedUser', updatedUser)

  return (
    <Screen className=''>
      <div className='w-full py-5 text-center text-xl font-medium text-black/70 dark:text-white/70'>
        Edit Your Profile
      </div>
      <div className='flex flex-grow flex-col justify-between gap-8'>
        <div>
          <div className='flex flex-col justify-center gap-2.5'>
            <div>
              <div className='px-1.5 text-lg font-medium text-black/60 dark:text-white/60'>Name</div>
              <Input
                type='text'
                name='name'
                placeholder='Enter your name'
                leftIcon={<Ic Icon={User} />}
                value={updatedUser.name}
                onChange={(e: any) => {
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
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
                  ) : isUsernameAvailable || username === user.username ? (
                    <Ic Icon={Check} className='text-green-500' />
                  ) : (
                    username.length > 3 && <Ic Icon={X} className='text-red-500' />
                  )
                }
                value={username}
                onChange={(e: any) => {
                  setUsername(e.target.value)

                  setUpdatedUser({ ...updatedUser, username: e.target.value })
                }}
              />
            </div>
            <div>
              <div className='px-1.5 text-lg font-medium text-black/60 dark:text-white/60'>Bio</div>
              <textarea
                className='h-36 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-4 text-sm font-medium text-black/60 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white/60'
                name='bio'
                placeholder='Enter your bio'
                value={updatedUser.bio}
                onChange={(e: any) => {
                  setUpdatedUser({ ...updatedUser, bio: e.target.value })
                }}
              />
            </div>
            <div>
              <div className='px-1.5 text-lg font-medium text-black/60 dark:text-white/60'>About</div>
              <textarea
                className='h-36 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-4 text-sm font-medium text-black/60 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white/60'
                name='about'
                placeholder='Enter about yourself'
                // leftIcon={<Ic Icon={User} />}
                value={updatedUser.about}
                onChange={(e: any) => {
                  setUpdatedUser({ ...updatedUser, about: e.target.value })
                }}
              />
            </div>

            {error && <Error error={error} />}
          </div>
        </div>
        {/* <Button
          title='Save'
          className='w-full'
          onClick={() => updateUser()}
          leftIcon={
            loading ? (
              <Ic Icon={LoaderCircle} className='animate-spin text-white dark:text-black' />
            ) : (
              <Ic Icon={LogIn} className='text-white dark:text-black' />
            )
          }
          disabled={loading}
        >
          Save
        </Button> */}
      </div>
      {/* <Button title='Save' onClick={() => getMe()} /> */}
    </Screen>
  )
}
