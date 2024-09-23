'use client'
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'
import { useState } from 'react'

export default function CommentReplay() {
  const [content, setContent] = useState('This is the nwe   replay  , edited  ')
  const commentId = '66edb30ea16250bcfa06e392'
  const replyTo = 'codeAntu'
  const commentReplyId = '66f05d5ff37ab0c3fcd63b37'

  async function replayComment() {
    try {
      const response = await axios.post('/api/activity/commentReply/createCommentReply', {
        content,
        commentId,
      })

      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function editCommentReply() {
    try {
      const response = await axios.post('/api/activity/commentReply/editCommentReplay', {
        content,
        commentReplyId,
      })

      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function deleteCommentReply() {
    try {
      const response = await axios.post('/api/activity/commentReply/deleteCommentReplay', {
        commentReplyId,
      })

      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <Screen className='gap-10'>
      <div>CommentReplay</div>

      <input type='text' />
      <Button onClick={replayComment} title='Replay'>
        Replay
      </Button>
      <Button onClick={editCommentReply} title='Edit'>
        Edit
      </Button>
      <Button onClick={deleteCommentReply} title='Delete'>
        Delete
      </Button>
    </Screen>
  )
}
