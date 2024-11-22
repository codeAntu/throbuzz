import { CommentReplaysT } from '@/lib/types'
import { create } from 'zustand'

interface newReplyT {
  newReply: CommentReplaysT
  setNewReply: (data: CommentReplaysT) => void
  clearNewReply: () => void
}

const initialReply: CommentReplaysT = {
  _id: '',
  userId: '',
  commentId: '',
  content: '',
  likes: 0,
  createdAt: new Date(),
  user: {
    profilePic: {
      imageUrl: '',
      publicId: '',
    },
    _id: '',
    name: '',
    username: '',
  },
  isLiked: false,
}

const newReply = create<newReplyT>((set) => {
  return {
    newReply: initialReply,
    setNewReply: (data: CommentReplaysT) => {
      set({ newReply: data })
    },
    clearNewReply: () => {
      set({ newReply: initialReply })
    },
  }
})

export default newReply
