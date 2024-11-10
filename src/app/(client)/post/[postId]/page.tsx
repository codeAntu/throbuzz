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

      setPost({
        _id: response.data.post._id,
        userId: response.data.post.userId,
        visibility: response.data.post.visibility,
        updatedAt: response.data.post.updatedAt,
        author: {
          name: response.data.user.name,
          username: response.data.user.username,
          profilePic: {
            imageUrl: response.data.user.profilePic.imageUrl,
            publicId: response.data.user.profilePic.publicId,
          },
        },
        text: response.data.post.text,
        createdAt: response.data.post.createdAt,
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
