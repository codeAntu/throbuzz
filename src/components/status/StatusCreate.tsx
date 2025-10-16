import axios from 'axios'
import React, { useRef, useState } from 'react'
import { z } from 'zod'

const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
const statusSchema = z
  .object({
    text: z.string().max(500, 'Text must be at most 500 characters').optional(),
    visibility: z.enum(['public', 'friends']),
    image: z
      .union([z.instanceof(File), z.undefined(), z.null()])
      .refine((file) => !file || file.size <= maxSizeInBytes, {
        message: 'Image must be less than 5MB',
      })
      .optional(),
  })
  .refine((data) => data.text || data.image, {
    message: 'Either text or image is required',
    path: ['text'],
  })

export function StatusComp({ onSuccess }: { onSuccess?: () => void }) {
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [visibility, setVisibility] = useState<'public' | 'friends'>('public')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    } else {
      setImage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    // Zod validation
    const validation = statusSchema.safeParse({ text, visibility, image })
    if (!validation.success) {
      setLoading(false)
      setError(validation.error.errors.map((e) => e.message).join(', '))
      return
    }
    try {
      const formData = new FormData()
      formData.append('text', text)
      formData.append('visibility', visibility)
      if (image) formData.append('image', image)
      const res = await axios.post('/api/user/status/createStatus', formData)
      setSuccess('Status added!')
      setText('')
      setImage(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (onSuccess) onSuccess()
    } catch (err: any) {
      let errorMsg = 'Failed to add status'
      if (err.response?.data?.error) {
        if (Array.isArray(err.response.data.error)) {
          errorMsg = err.response.data.error.map((e: any) => e.message).join(', ')
        } else if (typeof err.response.data.error === 'string') {
          errorMsg = err.response.data.error
        } else if (typeof err.response.data.error === 'object' && err.response.data.error.message) {
          errorMsg = err.response.data.error.message
        }
      } else if (err.message) {
        errorMsg = err.message
      }
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='rounded-xl p-6 shadow-lg'>
      <div className='mb-4 text-lg font-bold'>Create Status</div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <textarea
          className='rounded-lg border border-zinc-700 p-3 text-black focus:border-blue-500 focus:outline-none'
          placeholder='What’s on your mind?'
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
          rows={3}
        />
        <div>
          <label htmlFor='status-image' className='mb-1 block text-sm font-medium'>
            Image
          </label>
          <div className='relative flex items-center'>
            <input
              id='status-image'
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageChange}
              className='block w-full rounded-lg border border-zinc-700 p-2 text-black file:mr-4 file:rounded-lg file:border-0 file:px-4 file:py-2 file:font-semibold file:text-black file:transition focus:border-blue-500 focus:outline-none'
            />
          </div>
          {image && (
            <div className='mt-2 flex justify-center'>
              <img
                src={URL.createObjectURL(image)}
                alt='preview'
                className='h-32 w-32 rounded-lg border border-zinc-700 object-cover'
              />
            </div>
          )}
        </div>
        <div className='flex items-center gap-4'>
          <span className={`text-sm font-semibold ${visibility === 'public' ? 'text-blue-400' : 'text-zinc-300'}`}>
            Public
          </span>
          <button
            type='button'
            aria-label='Toggle visibility'
            className={`relative h-7 w-14 rounded-full transition-colors duration-200 focus:outline-none ${visibility === 'public' ? 'border border-blue-600' : 'border border-zinc-700'}`}
            onClick={() => setVisibility(visibility === 'public' ? 'friends' : 'public')}
          >
            <span
              className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${visibility === 'public' ? 'translate-x-0' : 'translate-x-7'}`}
            />
          </button>
          <span className={`text-sm font-semibold ${visibility === 'friends' ? 'text-blue-400' : 'text-zinc-300'}`}>
            Friends
          </span>
        </div>
        <button
          type='submit'
          className='rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-50'
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Status'}
        </button>
        {error && <div className='text-xs text-red-500'>{error}</div>}
        {success && <div className='text-xs text-green-500'>{success}</div>}
      </form>
    </div>
  )
}
