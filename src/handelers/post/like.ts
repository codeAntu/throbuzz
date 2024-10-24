import axios from 'axios'

export async function like({ postId, reaction }: { postId: string; reaction: string }) {
  try {
    const response = await axios.post('/api/activity/like', { postId, reaction })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export async function unlike({ postId }: { postId: string }) {
  try {
    const response = await axios.post('/api/activity/unLike', { postId })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.log(error)

    return error.response.data
  }
}
