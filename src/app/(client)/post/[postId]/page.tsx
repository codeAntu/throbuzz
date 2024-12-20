'use client'

import Header from '@/components/Header'
import Post from '@/components/Post'
import { Screen0 } from '@/components/Screen'
import { PostSkeletonImage } from '@/components/skeleton/PostSkeleton'
import { PostT } from '@/lib/types'
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
  const [loading, setLoading] = useState(true)
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
      <div className='p-5'>{post ? <Post post={post} /> : <PostSkeletonImage />}</div>
    </Screen0>
  )
}
