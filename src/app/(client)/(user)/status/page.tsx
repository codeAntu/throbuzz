'use client'
import { MyDialog } from '@/components/MyDialog'
import { StatusPageSkeleton } from '@/components/skeleton/StatusSkeleton'
import StatusCard from '@/components/status/StatusCard'
import { StatusComp } from '@/components/status/StatusCreate'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

type FollowingStatusGroup = {
  user: {
    _id: string
    name: string
    username: string
  }
  statuses: Array<{
    _id: string
    text: string
    image?: {
      publicId: string
      imageUrl: string
    }
    visibility: string
    createdAt: string
    expireAt: string
  }>
}

type FollowingStatuses = FollowingStatusGroup[]

export default function StatusPage() {
  const [myStatuses, setMyStatuses] = useState<any>({ user: null, statuses: [] })
  const [followingStatuses, setFollowingStatuses] = useState<FollowingStatuses>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllStatuses()
  }, [])

  const fetchAllStatuses = async () => {
    setLoading(true)
    try {
      const [myRes, followingRes] = await Promise.all([
        axios.get('/api/user/status/getMyStatus'),
        axios.get('/api/user/status/followingStatus'),
      ])
      setMyStatuses(myRes.data)
      setFollowingStatuses(followingRes.data.groupedStatuses || [])
    } catch (error) {
      console.error('Error fetching statuses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <StatusPageSkeleton />
  }

  // Prepare my statuses with user info (latest only, with count)
  const myLatestStatus =
    myStatuses.statuses && myStatuses.statuses.length > 0
      ? {
          ...myStatuses.statuses[0],
          user: myStatuses.user,
          statusCount: myStatuses.statuses.length,
        }
      : null

  return (
    <div className='mx-auto w-full max-w-4xl p-4'>
      {myStatuses.statuses && myStatuses.statuses.length > 0 && (
        <div className='mb-6 mt-6'>
          <h2 className='mb-3 text-lg font-semibold'>My Status</h2>
          <div className='flex gap-4'>
            <div className='flex flex-wrap gap-3'>
              <div className='relative'>
                {myStatuses.statuses.length > 1 && (
                  <span className='absolute -right-2 -top-2 z-50 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white'>
                    {myStatuses.statuses.length}
                  </span>
                )}
                <StatusCard
                  status={{
                    ...myStatuses.statuses[0],
                    user: myStatuses.user,
                    statuses: myStatuses.statuses,
                    statusIndex: 0,
                  }}
                />
              </div>
            </div>
            <MyDialog
              trigger={
                <div className='flex aspect-[9/16] h-56 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-blue-400/50'>
                  <span className='flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-blue-600/80 text-white'>
                    <Plus size={32} />
                  </span>
                </div>
              }
            >
              <StatusComp
                onSuccess={() => {
                  fetchAllStatuses()
                }}
              />
            </MyDialog>
          </div>
        </div>
      )}

      {followingStatuses.length > 0 && (
        <div className='mt-6'>
          <h2 className='mb-3 text-lg font-semibold'>Friends Status</h2>
          <div className='flex flex-wrap gap-3'>
            {followingStatuses.map((group: any) => (
              <div key={group.user._id} className='relative'>
                {/* Badge for total statuses */}
                {group.statuses.length > 1 && (
                  <span className='absolute -right-2 -top-2 z-10 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white'>
                    {group.statuses.length}
                  </span>
                )}
                <StatusCard
                  status={{
                    ...group.statuses[0],
                    user: group.user,
                    statuses: group.statuses,
                    statusIndex: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!myStatuses.statuses || myStatuses.statuses.length === 0) && followingStatuses.length === 0 && (
        <div className='py-12 text-center text-gray-500'>
          No statuses yet. Create one or follow people to see their statuses!
        </div>
      )}
    </div>
  )
}
