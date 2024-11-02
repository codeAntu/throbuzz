'use client'

import Header from '@/components/Header'
import Post, { PostT } from '@/components/Post'
import { Screen0 } from '@/components/Screen'

export default function PostPage() {
  return (
    <Screen0 className=''>
      <Header title='Post' />
      <div className='p-5'>{/* <Post post={} /> */}</div>
    </Screen0>
  )
}
