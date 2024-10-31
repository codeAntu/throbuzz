/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import useStore from '@/store/store'
import axios from 'axios'
import { useEffect } from 'react'

export default function GetMe() {
  const savedUser = useStore((state) => state.savedUser)
  const setSavedUser = useStore((state) => state.setSavedUser)

  async function getMe() {
    try {
      const response = await axios.get('/api/user/me')
      const { email, name, username, id, isVerified, profilePic } = response.data.user
      setSavedUser({ email, name, username, id, isVerified, profilePic })
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  return null
}
