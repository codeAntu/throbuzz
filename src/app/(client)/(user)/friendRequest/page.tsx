'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { title } from 'process'
import { useEffect, useState } from 'react'

interface FriendRequest {
  _id: string
  senderDetails: {
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
    bio: string
  }
}

export default function FriendRequest() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [nextPage, setNextPage] = useState('')

  console.log(friendRequests)

  console.log(nextPage)

  async function getFriendRequests() {
    try {
      const response = await axios.get('/api/user/getFriendRequests')
      // console.log(response.data)
      setFriendRequests(response.data.data)
      setNextPage(response.data.nextPage || '')
    } catch (error) {
      console.log(error)
    }
  }

  async function getNextFriendRequests(nextPage: string) {
    if (!nextPage) return console.log('No more friend requests')

    console.log('next page', nextPage)

    try {
      const response = await axios.get(nextPage)
      // console.log(response.data)
      setFriendRequests([...friendRequests, ...response.data.data])
      setNextPage(response.data.nextPage || '')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFriendRequests()
  }, [])

  return (
    <Screen>
      <div>Friends Requests</div>
      {friendRequests.map((friendRequest) => (
        <div key={friendRequest._id}>
          <div>{friendRequest.senderDetails.name}</div>
        </div>
      ))}
      <Button onClick={() => getNextFriendRequests(nextPage)} title='get'>
        Refresh
      </Button>
    </Screen>
  )
}
