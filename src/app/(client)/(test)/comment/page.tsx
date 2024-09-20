'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function CommentPage() {
  const [content, setContent] = useState('')
  const postId = '66ed3abd503db1b8ccac0e4b'
  async function handleComment(content: string, postId: string) {
    if (!content) {
      console.log('Content is required')

      return
    }

    if (!postId) {
      console.log('PostId is required')

      return
    }

    try {
      const response = await axios.post('/api/activity/comment', {
        content,
        postId,
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
    </Screen>
  )
}
