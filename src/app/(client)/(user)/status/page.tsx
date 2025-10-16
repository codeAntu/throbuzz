'use client'
import { MyDialog } from '@/components/MyDialog'
import StatusCard from '@/components/status/StatusCard'
import { StatusComp } from '@/components/status/StatusCreate'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function StatusPage() {
  const [myStatuses, setMyStatuses] = useState<any>({ user: null, statuses: [] })
  const [followingStatuses, setFollowingStatuses] = useState<any[]>([])
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
    return <div className='py-8 text-center text-sm'>Loading statuses...</div>
  }

  // Combine all statuses into one array
  const allStatuses = [
    ...(myStatuses.statuses || []).map((status: any) => ({ ...status, user: myStatuses.user })),
    ...followingStatuses.flatMap((group: any) =>
      group.statuses.map((status: any) => ({ ...status, user: group.user })),
    ),
  ]

  return (
    <div className='mx-auto w-full max-w-4xl p-4'>
      {/* Create Status Button & Dialog */}
      <MyDialog
        trigger={
          <div className='w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700'>
            + Create Status
          </div>
        }
      >
        <StatusComp
          onSuccess={() => {
            fetchAllStatuses()
          }}
        />
      </MyDialog>

      {/* All Statuses Flat Grid */}
      {allStatuses.length > 0 ? (
        <div className='flex flex-wrap gap-3'>
          {allStatuses.map((status: any) => (
            <StatusCard key={status._id} status={status} />
          ))}
        </div>
      ) : (
        <div className='py-12 text-center text-gray-500'>
          No statuses yet. Create one or follow people to see their statuses!
        </div>
      )}
    </div>
  )
}
