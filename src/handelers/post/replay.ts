import axios from 'axios'

export async function likeReplay(commentReplyId: string) {
  try {
    const response = await axios.post('/api/activity/likeOnCommentReply', {
      commentReplyId,
      reaction: 'like',
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export async function unlikeReplay(commentReplyId: string) {
  try {
    const response = await axios.post('/api/activity/unLikeOnCommentReply', {
      commentReplyId,
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
