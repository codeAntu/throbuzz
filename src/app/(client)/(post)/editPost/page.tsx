'use client'

import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function EditPostPage() {
  const [text, setText] = useState('Text')
  const [visibility, setVisibility] = useState('public')
  const [images, setImages] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const postId = '66ed34c0203ebd6aa6304ae7'
  const [postImages, setPostImages] = useState<string[]>([])

  async function getPost(postId: string) {
    try {
      const response = await axios.post('/api/post/getPost', {
        postId,
      })
      console.log(response.data)

      setText(response.data.post.text)
      setVisibility(response.data.post.visibility)
      setPostImages(response.data.post.images)
    } catch (error) {
      console.log('error', error)
    }
  }

  console.log(visibility)

  async function editPost({ text, visibility, postId }: { text: string; visibility: string; postId: string }) {
    try {
      const response = await axios.post('/api/post/editPost', {
        text,
        visibility,
        postId,
      })

      console.log('response', response.data)
    } catch (error) {
      console.log('error ', error)
    }
  }

  return (
    <Screen className='gap-10'>
      <div className='text-3xl font-bold text-blue-500'>Post</div>
      <div className='flex flex-col gap-10'>
        <textarea
          name=''
          id=''
          className='h-60 w-full rounded-xl border border-black/20 bg-black/5'
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        ></textarea>
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={(e) => {
            setImages(e.target.files)
          }}
        />
        <div className='flex gap-10'>
          <input
            type='checkbox'
            onChange={(e) => {
              setVisibility(visibility === 'public' ? 'private' : 'public')
            }}
          />
          <label htmlFor=''>Private</label>
        </div>
      </div>
      {error && <div className='text-red-500'>{error}</div>}

      <Button
        className='w-full'
        onClick={() => {
          console.log('clicked')
          // console.log('text', text)
          // console.log('isPrivate', isPrivate)
          // console.log('images', images)
          getPost(postId)
        }}
        title='Load Post '
      />

      <Button
        className='w-full'
        onClick={() => {
          console.log('clicked')
          // console.log('text', text)
          // console.log('isPrivate', isPrivate)
          // console.log('images', images)
          editPost({
            text,
            visibility,
            postId,
          })
        }}
        title='Edit Post'
      />
    </Screen>
  )
}
