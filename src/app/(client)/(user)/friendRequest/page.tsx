'use client'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function FriendRequest() {
  const [friendRequests, setFriendRequests] = useState([])

  async function getFriendRequests() {
    try {
      const response = await axios.get('/api/user/getFriendRequests')

      // setFriendRequests(response.data)
      console.log(response.data)
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
    </Screen>
  )
}
