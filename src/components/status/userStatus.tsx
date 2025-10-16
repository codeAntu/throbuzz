'use client'

import axios from 'axios'
import { useState } from 'react'

function UserCurrentStatusInput() {
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState<any>(null)
  const [statuses, setStatuses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async () => {
    setLoading(true)
    setError(null)
    setStatuses([])
    setUser(null)
    try {
      const res = await axios.post('/api/user/status/getUserStatuses', { userId })
      setUser(res.data.user)
      setStatuses(res.data.statuses || [])
    } catch (err: any) {
      setError('Failed to load status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mb-6'>
      <div className='mb-4 flex gap-2'>
        <input
          type='text'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder='Enter user ID...'
          className='flex-1 rounded border px-2 py-1'
        />
        <button
          onClick={handleFetch}
          className='rounded bg-blue-500 px-4 py-1 text-white disabled:opacity-50'
          disabled={loading || !userId}
        >
          {loading ? 'Loading...' : 'Get Status'}
        </button>
      </div>
      {error && <div className='mt-2 text-xs text-red-500'>{error}</div>}
      {user && (
        <div className='mb-3 flex items-center gap-3'>
          <img
            src={user.profileImage || '/images/user.png'}
            alt={user.username}
            className='h-10 w-10 rounded-full object-cover'
          />
          <div>
            <div className='font-semibold'>{user.name}</div>
            <div className='text-sm text-gray-500'>@{user.username}</div>
          </div>
        </div>
      )}
      {statuses.length > 0 && (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
          {statuses.map((status: any) => (
            <div
              key={status._id}
              className='relative flex h-56 flex-col justify-between rounded-xl bg-zinc-900 p-2 shadow-md'
            >
              {status.image && (
                <img
                  src={status.image.imageUrl}
                  alt='status-img'
                  className='mb-2 h-32 w-full rounded-lg object-cover'
                />
              )}
              <div className='flex-1 overflow-hidden'>
                {status.text && <div className='truncate text-base text-white'>{status.text}</div>}
              </div>
              <div className='absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/60 px-2 py-1'>
                <img
                  src={user.profileImage || '/images/user.png'}
                  alt='user-avatar'
                  className='h-7 w-7 rounded-full border border-white bg-zinc-800 object-cover'
                />
                <div className='text-xs font-semibold text-white'>{user.name || 'User'}</div>
                <div className='text-xs text-zinc-300'>@{user.username || 'user'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {user && statuses.length === 0 && (
        <div className='py-8 text-center text-gray-500'>No statuses found for this user.</div>
      )}
    </div>
  )
}

export default UserCurrentStatusInput
