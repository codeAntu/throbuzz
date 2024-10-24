import axios from 'axios'

export async function getComments(postId: string) {
  try {
    const response = await axios.post('/api/post/getComments', {
      postId,
    })
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}

export async function likeComment(commentId: string) {
  try {
    const response = await axios.post('/api/activity/likeOnComment', {
      commentId,
      reaction: 'like',
    })
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}

export async function unlikeComment(commentId: string) {
  try {
    const response = await axios.post('/api/activity/unLikeOnComment', {
      commentId,
    })
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}
