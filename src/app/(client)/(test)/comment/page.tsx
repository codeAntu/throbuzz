'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function CommentPage() {
  const [content, setContent] = useState('')
  const postId = '66f258800a11405088989155'
  const commentId = '66edb30ea16250bcfa06e392'

  async function handleComment(content: string, postId: string) {
    if (!content || !postId) return
    try {
      const response = await axios.post('/api/activity/comment/createComment', {
        content,
        postId,
      })
      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleDeleteComment(commentId: string) {
    try {
      const response = await axios.post('/api/activity/comment/deleteComment', {
        commentId: '66edb30ea16250bcfa06e392',
      })
      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleEditComment(content: string, commentId: string) {
    try {
      const response = await axios.post('/api/activity/comment/editComment', {
        content,
        commentId: '66f17d3814fc5db0aef96c1d',
      })
      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <Screen className='gap-10'>
      <div>
        <h1>Comment</h1>
      </div>
      <textarea
        className='h-32 w-full rounded border border-gray-300 p-2'
        placeholder='Write a comment'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <Button onClick={() => handleComment(content, postId)} title='Comment' />
      <Button onClick={() => handleDeleteComment(commentId)} title='Delete Comment' />
      <Button onClick={() => handleEditComment(content, commentId)} title='Edit Comment' />
    </Screen>
  )
}
