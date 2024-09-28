/* eslint-disable @next/next/no-img-element */
'use client'
import { Button, IconButton, OutlineButton } from '@/components/Button'
import { Screen } from '@/components/Screen'
import {
  Calendar,
  ChevronLeft,
  Ellipsis,
  EllipsisVertical,
  Github,
  Heart,
  Instagram,
  Link,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Twitter,
} from 'lucide-react'

interface UserResponseT {
  _id: string
  name: string
  username: string
  bio: string
  about: string
  profilePic: string
  coverPic: string
  followers: number
  following: number
  isMe: boolean
}

export default function UserProfile({
  params,
}: {
  params: {
    userName: string
    [key: string]: any
  }
}) {
  console.log('params', params)

  return (
    <Screen>
      <div className='flex items-center justify-between'>
        <ChevronLeft size={32} className='-ml-3' />
        <div className='text-[15px] font-semibold'>Profile</div>
        <Ellipsis size={28} className='' />
      </div>
      {Profile()}

      {/* {Posts()} */}

      <div className='text-red-500 dark:text-green-500'>Test</div>

      <IconButton>
        <ChevronLeft size={32} />
      </IconButton>
    </Screen>
  )
}

function Profile() {
  return (
    <div className='flex flex-col gap-5 py-5'>
      <div className='flex w-full items-center gap-5'>
        <div>
          <img src='/images/profile.jpg' alt='' className='w-28 rounded-full' />
        </div>
        <div className='grid flex-grow gap-5 py-4'>
          <div>
            <div className='line-clamp-1 text-base font-semibold leading-none'>Ananta Karmakar</div>
            <div className='line-clamp-1 text-sm'>@codeAntu</div>
          </div>
          <div className='flex w-full items-center gap-8 text-center'>
            <div>
              <div className='text-sm font-semibold leading-tight'>2.3k</div>
              <div className='text-xs text-transparent/50'>Posts</div>
            </div>
            <div>
              <div className='text-sm font-semibold leading-tight'>5.4k</div>
              <div className='text-xs text-transparent/50'>Followers</div>
            </div>
            <div>
              <div className='text-sm font-semibold leading-tight'>2k</div>
              <div className='text-xs text-transparent/50'>Following</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        {/* <Button className='border-2 border-black bg-black py-3 font-medium text-white'>Edit Profile</Button> */}
        <Button className='border-2 border-black bg-black py-3 font-medium text-white'>Follow</Button>
        <OutlineButton className='border-2 border-black py-3 font-medium text-black'>Message</OutlineButton>
      </div>
      <div className='space-y-1'>
        <div className='text-base font-semibold'>About</div>
        <div className='space-y-2'>
          <div className='text-[13px]'>
            Frontend Developer | React & Next.js | Freelancer | JS | Competitive Programmer
          </div>
          <div className='flex items-center gap-2'>
            <Mail size={20} className='text-black' />
            <p className='text-[13px] text-black/80'>codeAntu@gmail.com</p>
          </div>
          <div className='flex items-center gap-2'>
            <Phone size={20} className='text-black' />
            <p className='text-xs'>9800211400</p>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin size={20} className='text-black' />
            <p className='text-xs'>Mogra , Bankura </p>
          </div>
          <div className='flex items-center gap-2'>
            <Instagram size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>
          <div className='flex items-center gap-2'>
            <Twitter size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>{' '}
          <div className='flex items-center gap-2'>
            <Linkedin size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>{' '}
          <div className='flex items-center gap-2'>
            <Github size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>{' '}
          <div className='flex items-center gap-2'>
            <Link size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar size={20} className='text-black' />
            <p className='text-xs'>11 October 2003</p>
          </div>
        </div>
      </div>

      <hr />
      {/* <hr />
      <div className='flex items-center justify-around py-3'>
        <Instagram size={24} className='' />
        <Facebook size={24} />
        <Twitter size={24} />
        <Linkedin size={24} />
        <Github size={24} />
        <Link2 size={24} />
      </div>
      <br /> */}
    </div>
  )
}
function Posts() {
  return (
    <>
      <div className='space-y-3'>
        <div className='text-base font-semibold'>Posts</div>
        <Post />
      </div>
    </>
  )
}

function Post() {
  return (
    <div className='flex flex-col gap-2 rounded-3xl bg-purple-300/40 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <>
            <img src='/images/profile.jpg' alt='' className='aspect-square w-14 rounded-full' />
          </>
          <div>
            <h1 className='text-sm font-semibold leading-tight'>Ananta Karmakar</h1>
            <p className='text-xs text-transparent/50'>2 hours ago</p>
          </div>
        </div>
        <>
          <EllipsisVertical size={22} />
        </>
      </div>
      <div className='line-clamp-2 text-[13px] font-medium'>
        Hi everyone, I am a frontend developer. I am currently working on a project. I am looking for a job. If you have
        any job opportunity, please let me know. Thank you.
      </div>
      <div className='py-1.5'>
        <img src='/images/image.3.png' alt='' className='rounded-xl' />
      </div>
      <div className='flex items-center justify-between gap-5'>
        <div className='flex flex-grow items-center gap-4'>
          <div className='flex items-center gap-1.5'>
            <Heart size={22} className='font-semibold text-red-500 text-transparent/50' />
            <p className='text-sm font-semibold text-transparent/50'>5382</p>
          </div>
          <div className='flex items-center gap-1.5'>
            <MessageSquareText size={20} className='font-semibold text-transparent/50' />
            <p className='text-sm font-semibold text-transparent/50'>5382</p>
          </div>
        </div>
        <div className='rounded-full border bg-purple-300/50 px-5 py-2 text-xs font-semibold text-transparent/50'>
          set reaction
        </div>
      </div>
    </div>
  )
}

// export default function UserProfile({ params }: { params: any }) {
//   const router = useRouter()
//   const [user, setUser] = useState<UserResponseT>({
//     _id: '',
//     name: '',
//     username: '',
//     bio: '',
//     about: '',
//     profilePic: '',
//     coverPic: '',
//     followers: 0,
//     following: 0,
//     isMe: false,
//   })

//   useEffect(() => {
//     getUser()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   async function getUser() {
//     console.log('params', params.userName)

//     try {
//       const response = await axios.post('/api/user/getUser', { username: params.userName })
//       console.log('response', response.data)
//       setUser(response.data.user)
//     } catch (error: any) {
//       console.log('error', error.response)
//     }
//   }

//   console.log('user', user)

//   async function onLogout() {
//     try {
//       const response = await axios.post('/api/auth/logout')
//       console.log('response', response.data)
//       router.push('/login')
//     } catch (error: any) {
//       console.log('Logout failed')
//       console.log('error', error.response)
//     }
//   }

//   return (
//     <Screen0 className='relative'>
//       <div className='flex items-center justify-between gap-4 border-b bg-white px-1 py-2 dark:bg-black'>
//         <ChevronLeft
//           onClick={() => router.back()}
//           className='rounded-lg text-black/50 hover:cursor-pointer hover:bg-blue-50 dark:text-white/50'
//           size={32}
//         />
//         <div className='flex max-w-[400px] flex-grow items-center justify-between gap-2 rounded-full border-[1.5px] border-black/50 px-2 py-1 dark:border-white/50'>
//           <input
//             type='text'
//             className='bg-transparent px-1 text-sm text-black/70 outline-none dark:text-white/70'
//             placeholder='search '
//           />
//           <Search
//             className='rounded-lg p-0.5 text-black/50 hover:cursor-pointer hover:bg-blue-50 dark:text-white/50'
//             size={28}
//           />
//         </div>
//         <Bolt
//           className='rounded-lg px-1 text-black/50 hover:cursor-pointer hover:bg-blue-50 dark:text-white/50'
//           onClick={() => router.push('/settings')}
//           size={32}
//         />
//       </div>

//       <Bio user={user} />
//       {/* <Posts /> */}
//       {/* <Posts /> */}
//     </Screen0>
//   )
// }

// function Bio({ user }: { user: UserResponseT }) {
//   const [coverImage, setCoverImage] = useState<File | null>(null)
//   const [profileImage, setProfileImage] = useState<File | null>(null)
//   const [selectedImage, setSelectedImage] = useState('')
//   const [popup, setPopup] = useState(false)
//   const [isUploading, setIsUploading] = useState(false)
//   const [error, setError] = useState('')
//   const router = useRouter()

//   function handleProfileImageChange(e: React.ChangeEvent<HTMLInputElement>) {
//     if (e.target.files) {
//       setProfileImage(e.target.files[0])
//       setSelectedImage(URL.createObjectURL(e.target.files[0]))
//       setPopup(true)
//       console.log('profileImage', profileImage)
//     }
//   }

//   function handleCoverImageChange(e: React.ChangeEvent<HTMLInputElement>) {
//     if (e.target.files) {
//       setCoverImage(e.target.files[0])
//       setSelectedImage(URL.createObjectURL(e.target.files[0]))
//       setPopup(true)
//     }
//   }

//   async function uploadCoverImage() {
//     try {
//       if (!coverImage) return

//       setIsUploading(true)
//       setError('')

//       const formData = new FormData()
//       formData.append('coverImage', coverImage)

//       const response = await axios.post('/api/user/uploadCoverImage', formData)
//       console.log('response', response)
//       // reload the page
//       window.location.reload()
//     } catch (error: any) {
//       console.log('error', error)
//       setError(error.response.data.error)
//     }
//     setIsUploading(false)
//   }
//   async function uploadProfileImage() {
//     console.log('profileImage', profileImage)
//     if (!profileImage) {
//       console.log('No image selected')
//       return
//     }
//     try {
//       if (!profileImage) return
//       setIsUploading(true)
//       setError('')
//       const formData = new FormData()
//       formData.append('profileImage', profileImage)

//       const response = await axios.post('/api/user/uploadProfileImage', formData)
//       console.log('response', response)
//       // reload the page
//       window.location.reload()
//     } catch (error: any) {
//       console.log('error', error)
//       setError(error.response.data.error)
//     }
//     setIsUploading(false)
//   }

//   // skeleton
//   if (!user._id)
//     return (
//       <div className='animate-pulse'>
//         <div className=''>
//           <div className='relative'>
//             <img
//               alt=''
//               className='max-h-36 min-h-32 w-full border-b bg-slate-400 object-cover md:max-h-48 md:min-h-36'
//             />
//           </div>
//           <div className='flex w-full items-center justify-between px-4'>
//             <div className='relative -top-14 -mb-14 flex w-36 md:w-40'>
//               <img
//                 alt=''
//                 className='h-32 w-32 rounded-full border border-black/10 bg-slate-300 outline outline-[5px] outline-white dark:border-white/10 dark:bg-slate-700 dark:outline-black'
//               />
//             </div>
//           </div>
//         </div>
//         <div className='flex flex-col justify-center gap-3 px-5 py-3'>
//           <div className='grid gap-2'>
//             <div className='h-6 w-[40%] rounded-md bg-slate-300 dark:bg-slate-700'></div>
//             <div className='h-4 w-[30%] rounded-md bg-slate-200 dark:bg-slate-700'></div>
//           </div>

//           <div className='grid gap-1'>
//             <div className='h-4 rounded-md bg-slate-200 dark:bg-slate-700'></div>
//             <div className='h-4 rounded-md bg-slate-200 dark:bg-slate-700'></div>
//           </div>
//           <div className='flex items-center justify-normal gap-4 py-1'>
//             <div className='h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-700'></div>
//             <div className='h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-700'></div>
//           </div>
//           <div></div>
//         </div>

//         <div className='grid gap-3 border-t px-5 py-5 pt-3'>
//           <div>
//             <div className='h-5 w-20 bg-slate-200 dark:bg-slate-700'></div>
//           </div>
//           <div className='grid gap-1'>
//             <div className='h-4 rounded-md bg-slate-200 dark:bg-slate-700'></div>
//             <div className='h-4 rounded-md bg-slate-200 dark:bg-slate-700'></div>
//           </div>
//         </div>
//       </div>
//     )

//   return (
//     <div className=' '>
//       <div className=''>
//         <div className='relative'>
//           <img
//             src={user.coverPic || '/images/user/cover.png'}
//             alt='images/user/cover.png'
//             className='max-h-36 min-h-32 w-full border-b bg-slate-400 object-cover md:max-h-48 md:min-h-36'
//           />

//           {user.isMe && (
//             <MotionButton
//               onClick={() => {
//                 console.log('clicked')
//               }}
//               className='absolute bottom-2 right-2 cursor-pointer rounded-full border-2 border-white bg-slate-300 p-2 dark:border-black dark:bg-slate-700 dark:text-white'
//             >
//               <input
//                 type='file'
//                 accept='image/*'
//                 multiple
//                 className='hidden'
//                 id='coverImage'
//                 onChange={handleCoverImageChange}
//               />
//               <label htmlFor='coverImage'>
//                 <Pencil className='' size={22} />
//               </label>
//             </MotionButton>
//           )}

//           {user.isMe && (
//             <MotionButton
//               onClick={() => {
//                 console.log('clicked')
//               }}
//               className='absolute bottom-2 right-2 cursor-pointer rounded-full border-2 border-white bg-slate-300 p-2 dark:border-black dark:bg-slate-700 dark:text-white'
//             >
//               <input
//                 type='file'
//                 accept='image/*'
//                 multiple
//                 className='hidden'
//                 id='coverImage'
//                 onChange={handleCoverImageChange}
//               />
//               <label htmlFor='coverImage'>
//                 <Pencil className='' size={22} />
//               </label>
//             </MotionButton>
//           )}
//         </div>
//         <div className='flex w-full items-center justify-between px-4'>
//           <div className='relative -top-14 -mb-14 flex w-36 md:w-40'>
//             <img
//               src={user.profilePic || '/images/user/profile.png'}
//               alt='/images/user/profile.png'
//               className='h-32 w-32 rounded-full border border-black/10 bg-white object-cover outline outline-[5px] outline-white dark:border-white/10 dark:bg-black dark:outline-black'
//             />
//             {user.isMe && (
//               <MotionButton
//                 onClick={() => {
//                   console.log('clicked')
//                 }}
//                 className='absolute bottom-1 right-2 cursor-pointer rounded-full border-2 border-white bg-slate-300 p-2 duration-100 hover:scale-[1.03] dark:border-black dark:bg-slate-700 dark:text-white md:right-5'
//               >
//                 <input
//                   type='file'
//                   accept='image/*'
//                   multiple
//                   className='hidden'
//                   id='profileImage'
//                   onChange={handleProfileImageChange}
//                 />
//                 <label htmlFor='profileImage'>
//                   <Pencil className='' size={22} />
//                 </label>
//               </MotionButton>
//             )}
//           </div>
//           {user.isMe && (
//             <MotionButton
//               className='flex items-center justify-center gap-1 rounded-full border border-accent/60 bg-accent/5 px-4 py-1 text-sm text-accent duration-150 hover:bg-accent/10'
//               onClick={() => {
//                 console.log('Edit Profile')
//                 router.push('/profile/editProfile')
//               }}
//             >
//               <Pencil className='' size={16} />
//               Edit Profile
//             </MotionButton>
//           )}
//         </div>
//       </div>
//       <div className='flex flex-col justify-center gap-2 px-5 py-3'>
//         <div className=''>
//           <div className='line-clamp-2 text-2xl font-semibold leading-6'>{user.name}</div>
//           <div className='line-clamp-1 px-0.5 text-sm font-semibold text-black/70 dark:text-white/70'>
//             @ {user.username}
//           </div>
//         </div>
//         {user.bio ? (
//           <div className='line-clamp-3 text-sm font-medium text-black/70 dark:text-white/70'>{user.bio}</div>
//         ) : (
//           user.isMe && (
//             <div className='line-clamp-3 text-sm font-medium text-black/25 dark:text-white/25'>
//               Add a bio to your profile , click on Edit Profile
//             </div>
//           )
//         )}

//         <div className='flex items-center justify-normal gap-4 py-1 text-sm font-medium'>
//           <MotionButton className=''>
//             {user.followers}
//             <span className='text-black/60 dark:bg-white/60'> followers</span>
//           </MotionButton>
//           <MotionButton className=''>
//             {user.following}
//             <span className='text-black/60 dark:bg-white/60'> following </span>
//           </MotionButton>
//         </div>
//       </div>

//       {user.about ? (
//         <div className='grid gap-2 border-t-2 px-5 py-5 pt-3'>
//           <div>
//             <div className='text-lg font-semibold'>About</div>
//           </div>
//           <div>
//             <div className='text-sm text-black/70 dark:text-black/70'>{user.about}</div>
//           </div>
//         </div>
//       ) : (
//         user.isMe && (
//           <div className='grid gap-2 border-t-2 px-5 py-5 pt-3'>
//             <div>
//               <div className='text-lg font-semibold'>About</div>
//             </div>
//             <div>
//               <div className='text-sm font-medium text-black/25 dark:text-white/25'>Add a bio to your profile</div>
//             </div>
//           </div>
//         )
//       )}

//       {profileImage && popup && (
//         <div className=''>
//           <div
//             className='fixed left-0 top-0 h-full w-full bg-black/50 dark:bg-white/50 dark:text-black'
//             onClick={() => {
//               setPopup(false)
//             }}
//           ></div>
//           <div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
//             <div className='grid max-h-[50%] w-[95%] max-w-[600px] items-center justify-center gap-5 rounded-3xl bg-white p-5 dark:bg-black md:gap-8'>
//               <div className='flex flex-col items-center justify-center gap-1'>
//                 <div className='py-3 text-lg font-semibold'>Update Profile Picture</div>
//                 <img
//                   src={selectedImage}
//                   alt='images/user/profile.png'
//                   className='aspect-square w-2/3 rounded-full border border-black/10 object-cover dark:border-white/10'
//                 />
//               </div>
//               {error && <div className='text-red-500'>{error}</div>}
//               <div className='flex w-full flex-grow gap-5'>
//                 <OutlineButton
//                   onClick={() => {
//                     setPopup(false)
//                   }}
//                   title='cancel'
//                 />
//                 <Button
//                   onClick={uploadProfileImage}
//                   title='Upload'
//                   leftIcon={
//                     isUploading ? (
//                       <Ic Icon={LoaderCircle} className='animate-spin text-white dark:text-black' />
//                     ) : (
//                       <Ic Icon={LogIn} className='text-white dark:text-black' />
//                     )
//                   }
//                   disabled={isUploading}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {coverImage && popup && (
//         <div className=''>
//           <div
//             className='fixed left-0 top-0 h-full w-full bg-black/50 dark:bg-white/50 dark:text-black'
//             onClick={() => {
//               setPopup(false)
//             }}
//           ></div>
//           <div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
//             <div className='flex max-h-[50%] w-[95%] max-w-[600px] flex-col items-center justify-center gap-5 rounded-3xl bg-white p-5 dark:bg-black md:gap-8'>
//               <div className='flex w-full grow flex-col items-center justify-center gap-1'>
//                 <div className='py-3 text-lg font-semibold'>Update cover Picture</div>
//                 <img
//                   src={selectedImage}
//                   alt='images/user/profile.png'
//                   className='max-h-40 w-full rounded-xl border border-black/10 object-cover dark:border-white/10'
//                 />
//               </div>
//               {error && <div className='text-red-500'>{error}</div>}
//               <div className='flex w-full flex-grow gap-5'>
//                 <OutlineButton
//                   onClick={() => {
//                     setPopup(false)
//                   }}
//                   title='cancel'
//                 />
//                 <Button
//                   onClick={uploadCoverImage}
//                   title='Upload'
//                   leftIcon={
//                     isUploading ? (
//                       <Ic Icon={LoaderCircle} className='animate-spin text-white dark:text-black' />
//                     ) : (
//                       <Ic Icon={LogIn} className='text-white dark:text-black' />
//                     )
//                   }
//                   disabled={isUploading}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// function Posts() {
//   return (
//     <div className='border-t-2 pt-1 text-black dark:text-white'>
//       <div className='border-b border-black/10 bg-white py-4 dark:border-white/10 dark:bg-black'>
//         <div className='px-5 text-lg font-semibold leading-5'>Posts</div>
//         <div className='leading px-5 text-sm font-medium text-black/60 dark:text-white/60'>450 posts</div>
//       </div>
//       <div className='flex flex-col'>
//         {/* <Post /> */}
//         <Post />
//         <Post />
//         <Post />
//       </div>
//     </div>
//   )
// }

// function UpdateProfilePicture({ profileImage }: { profileImage: File }) {

// }
