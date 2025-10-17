import axios from 'axios'
import { Globe, Image, Lock, X } from 'lucide-react'
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
    <div className='w-full max-w-md rounded-2xl shadow-xl'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-zinc-900 dark:text-white'>Create Status</h2>
        <p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>Share what's on your mind</p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* Text Input */}
        <div>
          <textarea
            className='w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 text-zinc-900 placeholder-zinc-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500'
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            rows={4}
          />
          <div className='mt-1 text-right text-xs text-zinc-400'>{text.length}/500</div>
        </div>

        {/* Image Upload */}
        <div>
          <input
            id='status-image'
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageChange}
            className='hidden'
          />

          {!image ? (
            <label
              htmlFor='status-image'
              className='flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-6 transition hover:border-blue-400 hover:bg-blue-50/50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-500 dark:hover:bg-blue-950/30'
            >
              <Image className='h-6 w-6 text-zinc-400 dark:text-zinc-500' />
              <span className='font-medium text-zinc-600 dark:text-zinc-400'>Add an image</span>
            </label>
          ) : (
            <div className='relative'>
              <img src={URL.createObjectURL(image)} alt='preview' className='h-48 w-full rounded-xl object-cover' />
              <button
                type='button'
                onClick={() => {
                  setImage(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className='absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80'
                aria-label='Remove image'
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Visibility Toggle */}
        <div className='rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800'>
          <div className='mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300'>Visibility</div>
          <div className='flex items-center justify-between gap-4'>
            <button
              type='button'
              onClick={() => setVisibility('public')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition ${
                visibility === 'public'
                  ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                  : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              <Globe size={18} />
              <span className='font-semibold'>Public</span>
            </button>
            <button
              type='button'
              onClick={() => setVisibility('friends')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition ${
                visibility === 'friends'
                  ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                  : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              <Lock size={18} />
              <span className='font-semibold'>Friends</span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50'
          disabled={loading}
        >
          {loading ? (
            <span className='flex items-center justify-center gap-2'>
              <svg className='h-5 w-5 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create Status'
          )}
        </button>

        {/* Error & Success Messages */}
        {error && (
          <div className='rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400'>
            {error}
          </div>
        )}
        {success && (
          <div className='rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-950/30 dark:text-green-400'>
            {success}
          </div>
        )}
      </form>
    </div>
  )
}
