import axios from 'axios'

export async function follow(username: string) {
  try {
    const response = await axios.post('/api/user/follow', { username })
    return response
  } catch (error: any) {
    return error.response.data
  }
}

export async function unfollow(username: string) {
  try {
    const response = await axios.post('/api/user/unfollow', { username })
    return response
  } catch (error: any) {
    return error.response.data
  }
}
