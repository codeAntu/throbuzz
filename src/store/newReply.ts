import { CommentReplaysT } from '@/components/Post'
import { create } from 'zustand'

interface newReplyT {
  newReply: CommentReplaysT
  setNewReply: (data: CommentReplaysT) => void
  clearNewReply: () => void
}

const newReply = create<newReplyT>((set) => {
  return {
    newReply: {
      _id: '',
      userId: {
        profilePic: {
          imageUrl: '',
          publicId: '',
        },
        _id: '',
        name: '',
      },
      commentId: '',
      postId: '',
      content: '',
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      isLiked: false,
    },
    setNewReply: (data: CommentReplaysT) => {
      set({ newReply: data })
    },
    clearNewReply: () => {
      set({
        newReply: {
          _id: '',
          userId: {
            profilePic: {
              imageUrl: '',
              publicId: '',
            },
            _id: '',
            name: '',
          },
          commentId: '',
          postId: '',
          content: '',
          likes: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
          isLiked: false,
        },
      })
    },
  }
})

export default newReply
