/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Error from '@/components/Error'
import Header from '@/components/Header'
import { Ic } from '@/components/Icon'
import Input from '@/components/Input'
import { Screen0 } from '@/components/Screen'
import useStore from '@/store/store'
import axios from 'axios'
import { AtSign, Check, ChevronLeft, ImagePlus, LoaderCircle, Pen, Pencil, Trash2, User, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface MeT {
  _id: string
  profilePic: {
    imageUrl: string
    publicId: string
  }
  name: string
  username: string
  bio: string
  email: string
  phone: string
  instagram: string
  github: string
  twitter: string
  facebook: string
  linkedin: string
  website: string
}

export default function Edit() {
  const [user, setUser] = useState<MeT | null>(null)

  const [updatedUser, setUpdatedUser] = useState<MeT>({
    _id: '',
    profilePic: { imageUrl: '', publicId: '' },
    name: '',
    username: '',
    bio: '',
    email: '',
    phone: '',
    instagram: '',
    github: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    website: '',
  })

  const [newUsername, setNewUsername] = useState('')
  const [error, setError] = useState('')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)
  const [isUsernameChecking, setIsUsernameChecking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const savedUser = useStore((state) => state.savedUser)
  const setSavedUser = useStore((state) => state.setSavedUser)

  const router = useRouter()

  async function checkUsername() {
    if (newUsername.length < 3) {
      setIsUsernameAvailable(false)
      return
    }
    setIsUsernameChecking(true)

    try {
      const response = await axios.post('/api/auth/check-username', { username: newUsername })
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
    setLoading(true)
    console.log('updatedUser', updatedUser)

    if (!user || !updatedUser) {
      console.log('No user found')
      setLoading(false)
      return
    }

    if (!(isUsernameAvailable || newUsername === user.username)) {
      console.log('Username is not available')
      setError('Username is already taken')
      setLoading(false)
      return
    }

    const name = user.name === updatedUser.name ? undefined : updatedUser.name
    const username = user.username === updatedUser.username ? undefined : updatedUser.username
    const bio = user.bio === updatedUser.bio ? undefined : updatedUser.bio
    const phone = user.phone === updatedUser.phone ? undefined : updatedUser.phone
    const instagram = user.instagram === updatedUser.instagram ? undefined : updatedUser.instagram
    const github = user.github === updatedUser.github ? undefined : updatedUser.github
    const twitter = user.twitter === updatedUser.twitter ? undefined : updatedUser.twitter
    const facebook = user.facebook === updatedUser.facebook ? undefined : updatedUser.facebook
    const linkedin = user.linkedin === updatedUser.linkedin ? undefined : updatedUser.linkedin
    const website = user.website === updatedUser.website ? undefined : updatedUser.website

    if (
      !name &&
      !username &&
      !bio &&
      !phone &&
      !instagram &&
      !github &&
      !twitter &&
      !facebook &&
      !linkedin &&
      !website &&
      !profileImage
    ) {
      setLoading(false)
      console.log('No changes made')

      return
    }

    console.log('name', name)

    console.log('here')

    try {
      const formData = new FormData()
      if (name) formData.append('name', name)
      if (username) formData.append('username', username)
      if (bio) formData.append('bio', bio)
      if (phone) formData.append('phone', phone)
      if (instagram) formData.append('instagram', instagram)
      if (github) formData.append('github', github)
      if (twitter) formData.append('twitter', twitter)
      if (facebook) formData.append('facebook', facebook)
      if (linkedin) formData.append('linkedin', linkedin)
      if (website) formData.append('website', website)
      if (profileImage) formData.append('profileImage', profileImage)

      const response = await axios.post('/api/user/updateUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('response', response.data)

      // Update savedUser in the store
      setSavedUser({
        email: updatedUser.email,
        name: updatedUser.name,
        username: updatedUser.username,
        id: updatedUser._id,
        isVerified: true,
        profilePic: updatedUser.profilePic,
      })
      router.push(`/profile/${updatedUser.username}`)
    } catch (error: any) {
      console.log('error', error.response)
    }
    setLoading(false)
  }

  async function getMe() {
    try {
      const response = await axios.get('/api/user/me')
      console.log('response', response.data)
      setUser(response.data.user)
      setUpdatedUser(response.data.user)
      setNewUsername(response.data.user.username)
    } catch (error: any) {
      console.log('error', error.response.data)
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkUsername()
    }, 300)
    return () => clearTimeout(timeout)
  }, [newUsername])

  useEffect(() => {
    setError('')
  }, [updatedUser, newUsername])

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    setProfileImage(file)
    setProfileImageUrl(URL.createObjectURL(file))
  }

  if (!user) return <div>Loading...</div>

  return (
    <Screen0 className=''>
      <Header title='Edit Profile'>
        <Button
          variant='text'
          className='rounded-full p-3 text-sm text-accent active:bg-accent/20 dark:text-accent md:p-3'
          onClick={() => {
            updateUser()
          }}
        >
          <div>Save</div>
        </Button>
      </Header>

      <div className='flex flex-grow flex-col justify-between gap-8 px-5 py-6'>
        <div>
          <div className='flex flex-col justify-center gap-2.5'>
            <div className='flex flex-col items-center justify-center gap-2 sm:gap-4'>
              <img
                src={profileImageUrl || user.profilePic.imageUrl || '/images/img1.png'}
                alt=''
                className='size-36 rounded-full object-cover'
              />
              <input
                type='file'
                name='profileImage'
                id='profilePicInput'
                className='hidden'
                onChange={handleImageChange}
              />
              <label htmlFor='profilePicInput' className=''>
                <div className='flex w-full gap-2 rounded-full border-2 border-none border-black bg-black px-7 py-2 text-xs font-medium text-white dark:border-white dark:bg-white dark:text-black'>
                  <Pencil size={14} className='' />
                  <span>Edit</span>
                </div>
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
                  ) : isUsernameAvailable || newUsername === user.username ? (
                    <Ic Icon={Check} className='text-green-500' />
                  ) : (
                    newUsername.length > 3 && <Ic Icon={X} className='text-red-500' />
                  )
                }
                value={newUsername}
                onChange={(e: any) => {
                  setNewUsername(e.target.value)
                  setUpdatedUser({ ...updatedUser, username: e.target.value })
                }}
              />
            </div>
            <div>
              <div className='px-1.5 text-base font-medium text-black/80 dark:text-white/80'>Bio</div>
              <textarea
                className='h-36 w-full rounded-2xl border border-black/5 bg-black/5 px-4 py-4 text-sm font-medium text-black/80 placeholder-zinc-400/60 outline-none dark:border-white/5 dark:bg-white/5 dark:text-white/80 dark:placeholder-zinc-700'
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
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/70 placeholder-zinc-400/60 outline-none dark:text-white/70 dark:placeholder-zinc-700'
                    placeholder='example@gmail.com'
                    value={updatedUser.email}
                    onChange={(e: any) => {
                      setUpdatedUser({ ...updatedUser, email: e.target.value })
                    }}
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Phone No :</div>
                  <input
                    type='number'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/70 placeholder-zinc-400/60 outline-none dark:text-white/70 dark:placeholder-zinc-700'
                    placeholder='9876543210'
                    value={updatedUser.phone}
                    onChange={(e: any) => {
                      setUpdatedUser({ ...updatedUser, phone: e.target.value })
                    }}
                  />
                </div>
                {/* <div className='flex items-center justify-normal gap-3'>
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
                </div> */}
              </div>
            </div>
            <div className='space-y-2 py-2'>
              <div className='px-1.5 text-base font-medium text-black/80 dark:text-white/60'>Public Links</div>
              <div className='grid gap-3 rounded-md border-black/10 bg-black/5 px-5 py-4 text-sm font-medium text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75 sm:font-medium'>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Instagram :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/70 placeholder-zinc-400/60 outline-none dark:text-white/70 dark:placeholder-zinc-700'
                    placeholder='insta@1234'
                    value={updatedUser.instagram}
                    onChange={(e: any) => {
                      setUpdatedUser({ ...updatedUser, instagram: e.target.value })
                    }}
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Github :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/70 placeholder-zinc-400/60 outline-none dark:text-white/70 dark:placeholder-zinc-700'
                    placeholder='github@1234'
                    value={updatedUser.github}
                    onChange={(e: any) => {
                      setUpdatedUser({ ...updatedUser, github: e.target.value })
                    }}
                  />
                </div>

                <div className='flex items-center justify-normal gap-3'>
                  <div>Twitter :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/70 placeholder-zinc-400/60 outline-none dark:text-white/70 dark:placeholder-zinc-700'
                    placeholder='twitter@1234'
                    value={updatedUser.twitter}
                    onChange={(e: any) => {
                      setUpdatedUser({ ...updatedUser, twitter: e.target.value })
                    }}
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>Facebook :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/70 placeholder-zinc-400/60 outline-none dark:text-white/70 dark:placeholder-zinc-700'
                    placeholder='facebook@1234'
                    value={updatedUser.facebook}
                    onChange={(e: any) => {
                      setUpdatedUser({ ...updatedUser, facebook: e.target.value })
                    }}
                  />
                </div>
                <div className='flex items-center justify-normal gap-3'>
                  <div>LinkedIn :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/70 placeholder-zinc-400/60 outline-none dark:text-white/70 dark:placeholder-zinc-700'
                    placeholder='linkedin@1234'
                    value={updatedUser.linkedin}
                    onChange={(e: any) => {
                      setUpdatedUser({ ...updatedUser, linkedin: e.target.value })
                    }}
                  />
                </div>

                <div className='flex items-center justify-normal gap-3'>
                  <div>Website :</div>
                  <input
                    type='text'
                    className='w-[70%] bg-transparent px-1 py-1.5 text-black/70 placeholder-zinc-400/60 outline-none dark:text-white/70 dark:placeholder-zinc-700'
                    placeholder='www.example.com'
                    value={updatedUser.website}
                    onChange={(e: any) => {
                      setUpdatedUser({ ...updatedUser, website: e.target.value })
                    }}
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
