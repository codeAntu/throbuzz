'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { use, useCallback, useEffect, useState } from 'react'

export default function Post() {
  const [text, setText] = useState('Text')
  const [isPrivate, setIsPrivate] = useState(false)
  const [images, setImages] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createPost = useCallback(async () => {
    if (!text && !images) {
      setError('Text or images required')
      return
    }

    try {
      const formData = new FormData()

      formData.append('text', text)
      formData.append('isPrivate', isPrivate.toString())

      if (images) {
        if (images.length > 10) {
          setError('You can only upload 10 images at a time')
          return
        }
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i])
        }
      }

      const response = await axios.post('/api/post/createPost', formData)

      console.log('response', response)
    } catch (error: any) {
      console.log('error', error.response.data)
    }
  }, [images, isPrivate, text])

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
              setIsPrivate(e.target.checked)
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
          console.log('text', text)
          console.log('isPrivate', isPrivate)
          console.log('images', images)

          createPost()
        }}
        title='POST'
      />
    </Screen>
  )
}
