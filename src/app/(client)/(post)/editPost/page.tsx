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
  const postId = '66f2e42e108a3040e088d114'
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

  async function deletePost(postId: string) {
    try {
      const response = await axios.post('/api/post/deletePost', {
        postId: '66f2697fdbb5e1ae7c5a2e26',
      })
      console.log(response.data)
    } catch (error) {
      console.log('error', error)
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
          getPost(postId)
        }}
        title='Load Post '
      />

      <Button
        className='w-full'
        onClick={() => {
          console.log('clicked')
          editPost({
            text,
            visibility,
            postId,
          })
        }}
        title='Edit Post'
      />

      <Button
        className='w-full'
        onClick={() => {
          console.log('clicked')
          deletePost('66ed1a49c55a10fe7d426dab')
        }}
        title='Delete Post'
      />
    </Screen>
  )
}
