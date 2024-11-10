import axios from 'axios'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

export function DeletePost() {
  async function deletePost(postId: string) {
    try {
      const response = await axios.post('/api/post/deletePost', {
        postId: '66f2697fdbb5e1ae7c5a2e26',
      })
      console.log(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
