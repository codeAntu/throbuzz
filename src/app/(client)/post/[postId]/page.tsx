'use client'

import Header from '@/components/Header'
import Post, { PostT } from '@/components/Post'
import { Screen0 } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function PostPage({
  params,
}: {
  params: {
    postId: string
  }
}) {
  const [post, setPost] = useState<PostT | null>(null)

  // console.log(params.postId)

  async function getPost() {
    try {
      const response = await axios.post('/api/post/getPost', { postId: params.postId })
      console.log(response.data)

      setPost(response.data.post)
    } catch (error: any) {
      console.error(error)
    }
  }

  if (!post) {
    getPost()
  }

  return (
    <Screen0 className=''>
      <Header title='Post' />
      <div className='p-5'>{post ? <Post post={post} /> : <div className='text-center'>Loading...</div>}</div>
    </Screen0>
  )
}
