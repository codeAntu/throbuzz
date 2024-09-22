'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function CommentReplay() {
  const [content, setContent] = useState('This is the replay')
  const commentId = '66edb30ea16250bcfa06e392'
  const replyTo = 'codeAntu'

  async function replayComment() {
    try {
      const response = await axios.post('/api/activity/commentReply/createCommentReplySchema', {
        content,
        commentId,
        replyTo,
      })

      console.log(response.data)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <Screen className='gap-10'>
      <div>CommentReplay</div>

      <input type='text' />
      <Button onClick={replayComment} title='Replay'>
        Replay
      </Button>
    </Screen>
  )
}
