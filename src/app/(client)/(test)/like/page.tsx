'use client'

import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function LikePage() {
  const postId = '66f258800a11405088989155'
  const [text, setText] = useState('Text')

  async function getPost(postId: string) {
    try {
      const response = await axios.post('/api/post/getPost', {
        postId,
      })
      console.log(response.data)

      setText(response.data.post.text)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function likePost(postId: string) {
    try {
      const response = await axios.post('/api/activity/like', {
        postId,
        reaction: 'like',
      })
      console.log(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function unLikePost(postId: string) {
    try {
      const response = await axios.post('/api/activity/unLike', {
        postId,
      })
      console.log(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Screen className='gap-10'>
      <div className='pb-30'>
        <h1>Like Page</h1>
      </div>
      {text}
      <Button onClick={() => likePost(postId)} title='Like' />
      <Button onClick={() => unLikePost(postId)} title='Unlike' />
      <Button
        className='w-full'
        onClick={() => {
          console.log('clicked')
          getPost(postId)
        }}
        title='Load Post '
      />
    </Screen>
  )
}
