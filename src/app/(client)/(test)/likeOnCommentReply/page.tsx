'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'

export default function Page() {
  const commentReplyId = '66f11a690fcaad9981af85a9'

  async function likeOnCommentReply() {
    try {
      const response = await axios.post('/api/activity/likeOnCommentReply', {
        commentReplyId,
        reaction: 'like',
      })
      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function unLikeOnCommentReply() {
    try {
      const response = await axios.post('/api/activity/unLikeOnCommentReply', {
        likeOnCommentReplyId: '66f155172ad6095826dbe24e',
      })
      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Screen>
      <Button onClick={likeOnCommentReply} title='Like on Comment Reply'></Button>
      <Button onClick={unLikeOnCommentReply} title='Unlike on Comment Reply'></Button>
    </Screen>
  )
}
