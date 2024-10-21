/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Error from '@/components/Error'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen0 } from '@/components/Screen'
import axios from 'axios'
import { AtSign, Check, ChevronLeft, ImagePlus, LoaderCircle, Pen, Pencil, Trash2, User, X } from 'lucide-react'
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
    <Screen0 className=''>
      <Header />
      <div className='flex flex-grow flex-col justify-between gap-8 px-5 py-6'>
        <div>
          <div className='flex flex-col justify-center gap-2.5'>
            <div className='flex flex-col items-center justify-center gap-2 sm:gap-4'>
              <img src='/images/img1.png' alt='' className='size-36 rounded-full bg-red-500' />
              <input type='file' name='' id='profilePicInput' className='hidden' />
              <label htmlFor='profilePicInput' className=''>
                <Button variant='filled' className='rounded-full border-none px-7 text-xs font-medium'>
                  <Pencil size={14} className='' />
                  <span>Edit</span>
                </Button>
              </label>
            </div>
            <div>
              <div className='px-1.5 text-base font-medium text-black/80 dark:text-white/80'>Name</div>
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
              <div className='px-1.5 text-base font-medium text-black/80 dark:text-white/80'>UserName</div>

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
              <div className='px-1.5 text-base font-medium text-black/80 dark:text-white/80'>Bio</div>
              <textarea
                className='h-36 w-full rounded-2xl border border-black/5 bg-black/5 px-4 py-4 text-sm font-medium text-black/80 outline-none dark:border-white/5 dark:bg-white/5 dark:text-white/80'
                name='bio'
                placeholder='Enter your bio'
                value={updatedUser.bio}
                onChange={(e: any) => {
                  setUpdatedUser({ ...updatedUser, bio: e.target.value })
                }}
              />
            </div>
            <div className='space-y-2'>
              <div className='px-1.5 text-base font-medium text-black/80 dark:text-white/80'>About </div>
              <div className='grid gap-3 rounded-md border border-black/5 bg-black/5 px-5 py-4 text-sm font-medium text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75 sm:font-medium'>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Email :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='example@gmail.com'
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Phone No :</div>
                  <input
                    type='number'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='9876543210'
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Birthday :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='11-10-1999'
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Location :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='Your city'
                  />
                </div>
              </div>
            </div>
            <div className='space-y-2 py-2'>
              <div className='px-1.5 text-base font-medium text-black/80 dark:text-white/60'>Public Links</div>
              <div className='grid gap-3 rounded-md border-black/10 bg-black/5 px-5 py-4 text-sm font-medium text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75 sm:font-medium'>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Instagram :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='insta@1234'
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Github :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='github@1234'
                  />
                </div>

                <div className='flex items-center justify-normal gap-3'>
                  <div>Twitter :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='twitter@1234'
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Facebook :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='facebook@1234'
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>LinkedIn :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='linkedin@1234'
                  />
                </div>

                <div className='flex items-center justify-normal gap-3'>
                  <div>Website :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/50 outline-none dark:text-white/50'
                    placeholder='www.example.com'
                  />
                </div>
              </div>
            </div>
            {error && <Error error={error} />}
          </div>
        </div>
      </div>
    </Screen0>
  )
}

function Header() {
  const router = useRouter()
  return (
    <div className='z-10 flex min-h-3 w-full items-center justify-between border-b border-black/5 bg-white/80 px-3 py-1.5 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
      <Button
        variant='icon'
        className='rounded-full p-3 active:bg-black/10 dark:active:bg-white/10'
        onClick={() => {
          router.back()
        }}
      >
        <ChevronLeft size={24} />
      </Button>
      <div className='text-base font-bold'>Edit Profile</div>
      <Button
        variant='text'
        className='rounded-full p-3 text-sm text-accent active:bg-accent/20 active:dark:bg-accent md:p-3'
      >
        <div>
          Save
        </div>
      </Button>
    </div>
  )
}
