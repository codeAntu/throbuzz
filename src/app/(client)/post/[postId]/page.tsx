'use client'

import Header from '@/components/Header'
import Post, { PostT } from '@/components/Post'
import { Screen0 } from '@/components/Screen'

const samplePost: PostT = {
  id: '1',
  name: 'Ananta Karmanar',
  username: 'codeAntu',
  profilePic: '/images/profile.jpg',
  time: 1630000000000,
  content:
    'Hi everyone, I am a frontend developer. I am currently working on a project. I am looking for a job. If you have any job opportunity, please let me know. Thank you.',
  image: ['/images/img1.png', '/images/img2.png', '/images/img3.png', '/images/img4.png', '/images/img5.png'],
  // image: ['/images/img1.png'],
  likes: 5382,
  comments: 5382,
  color: 'blue',
}

export default function PostPage() {
  return (
    <Screen0 className=''>
      <Header title='Post' />
      <div className='p-5'>
        <Post post={samplePost} />
      </div>
    </Screen0>
  )
}
