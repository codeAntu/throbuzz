'use client'

import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'

export default function Page() {
  const commentId = '66f258b70a11405088989159'

  async function likeOnComment() {
    try {
      const response = await axios.post('/api/activity/likeOnComment', {
        commentId,
        reaction: 'love',
      })
      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function unLikeOnComment() {
    try {
      const response = await axios.post('/api/activity/unLikeOnComment', {
        likeOnCommentId: '66f14d3207fb48ea8ad834d1',
      })
      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Screen>
      <Button onClick={likeOnComment} title='Like on Comment'></Button>
      <Button onClick={unLikeOnComment} title='Unlike on Comment'></Button>
    </Screen>
  )
}
