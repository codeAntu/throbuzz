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

      console.log(response.data.post)

      setPost({
        id: response.data.post._id,
        name: response.data.user.name,
        username: response.data.user.username,
        profilePic: {
          imageUrl: response.data.user.profilePic.imageUrl,
          publicId: response.data.user.profilePic.publicId,
        },
        time: response.data.post.createdAt,
        content: response.data.post.text,
        postImages: response.data.post.postImages,
        likes: response.data.post.likes,
        comments: response.data.post.comments,
        isLiked: response.data.post.isLiked,
        isMine: response.data.post.isMine,
        color: response.data.post.color,
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  if (!post) {
    getPost()
  }

  console.log(post)

  return (
    <Screen0 className=''>
      <Header title='Post' />
      <div className='p-5'>{post ? <Post post={post} /> : <div className='text-center'>Loading...</div>}</div>
    </Screen0>
  )
}
