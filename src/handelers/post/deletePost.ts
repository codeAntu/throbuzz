import axios from 'axios'

export async function deletePost(postId: string) {
  try {
    const response = await axios.post('/api/post/deletePost', { postId })
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}
