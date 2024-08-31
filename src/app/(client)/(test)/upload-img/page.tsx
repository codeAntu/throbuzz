'use client'

import { Button } from '@/components/Button'
import Input from '@/components/Input'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function UploadImg() {
  const [img, setImg] = useState<File | null>(null)
  const [publicId, setPublicId] = useState<string>('' as string)
  const [video, setVideo] = useState<File | null>(null)

  // const publicId = 'test/dsx25tv4wbglnbsqr4pt'

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImg(e.target.files[0])
    }
  }

  async function upload() {
    console.log('img', img)

    try {
      if (!img) return

      const formData = new FormData()
      formData.append('image', img)

      const response = await axios.post('/api/temp/upload-img', formData)
      setPublicId(response.data.img.public_id)
      console.log('response', response)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function deleteImg() {
    console.log('publicId', publicId)

    try {
      const response = await axios.delete('/api/temp/delete-img', { data: { publicId } })

      console.log('response', response)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function uploadVideo() {
    console.log('video', video)

    try {
      if (!video) return

      const formData = new FormData()
      formData.append('video', video)

      const response = await axios.post('/api/temp/upload-video', formData)

      setPublicId(response.data.img.public_id)

      console.log('response', response)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Screen>
      <div className='grid w-full gap-10'>
        <input type='file' onChange={handleFileChange} className='h-10 w-full rounded-md border border-black/10 p-2' />
        <Button
          title='Upload'
          onClick={() => {
            upload()
          }}
        >
          Upload
        </Button>
        <Button
          title='Delete'
          onClick={() => {
            deleteImg()
          }}
        >
          Delete
        </Button>
        <input
          type='file'
          onChange={(e) => {
            if (e.target.files) {
              setVideo(e.target.files[0])
            }
          }}
        />
        <Button
          title='Upload Video'
          onClick={() => {
            uploadVideo()
          }}
        >
          Upload Video
        </Button>
      </div>
    </Screen>
  )
}
