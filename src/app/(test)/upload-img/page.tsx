'use client'

import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function UploadImg() {
  const [img, setImg] = useState<File | null>(null)

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
      </div>
    </Screen>
  )
}
