'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { use, useCallback, useEffect, useState } from 'react'

export default function Post() {
  const [text, setText] = useState('Text')
  const [visibility, setVisibility] = useState('public')
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
      formData.append('visibility', visibility)

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
  }, [images, text, visibility])

  return (
    <Screen className='gap-10'>
      <div>Post</div>
    </Screen>
  )
}
