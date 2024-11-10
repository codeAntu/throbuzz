/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client '
import { Button } from '@/components/Button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { colors } from '@/lib/const'
import { nFormatter } from '@/utils/utils'
import {
  Divide,
  Ellipsis,
  EllipsisVertical,
  Heart,
  Link,
  LoaderCircle,
  MessageSquareText,
  Pencil,
  Trash,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { like, unlike } from '@/handelers/post/like'
import { getComments, likeComment, unlikeComment } from '@/handelers/post/comment'
import axios from 'axios'
import Img from '@/components/Img'
import PostImg from './postImg'
import useStore from '@/store/store'
import { set } from 'mongoose'
import { useRouter } from 'next/navigation'
import { likeReplay, unlikeReplay } from '@/handelers/post/replay'
import newReply from '@/store/newReply'

export interface PostT {
  _id: string
  author: {
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
  }
  userId: string
  text: string
  postImages: {
    publicId: string
    imageUrl: string
    _id: string
  }[]
  visibility: string
  likes: number
  comments: number
  createdAt: Date
  updatedAt: Date
  // __v: number
  isLiked: boolean
  isMine?: boolean
  color:
    | 'slate'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'pink'
    | 'fuchsia'
}

interface CommentT {
  _id: string
  userId: {
    profilePic: { imageUrl: string; publicId: string }
    _id: string
    name: string
    username: string
  }
  postId: string
  content: string
  likes: number
  isLiked: boolean
  comments: number
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface CommentReplaysT {
  _id: string
  userId: {
    profilePic: {
      imageUrl: string
      publicId: string
    }
    _id: string
    name: string
  }
  commentId: string
  postId: string
  content: string
  likes: number
  createdAt: Date
  updatedAt: Date
  __v: number
  isLiked: boolean
}

export default function Post({ post }: { post: PostT }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [showReactions, setShowReactions] = useState()
  const [likeCount, setLikeCount] = useState(post.likes)
  const [copyLink, setCopyLink] = useState(false)
  const router = useRouter()

  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  async function handleLike() {
    post.likes = post.likes + 1
    setIsLiked(true)
    const response = await like({ postId: post._id, reaction: 'like' })
    if (response.error) {
      post.likes = post.likes - 1
      setIsLiked(false)
    }
  }

  async function handleUnlike() {
    post.likes = post.likes - 1
    setIsLiked(false)
    const response = await unlike({ postId: post._id })
    if (response.error) {
      post.likes = post.likes + 1
      setIsLiked(true)
    }
  }

  return (
    <div
      className={`flex flex-col gap-2 rounded-3xl border border-slate-400/5 px-3.5 py-4 pb-2.5 text-black sm:p-4 ${colors[post.color as keyof typeof colors].card} `}
    >
      <div className='flex items-start gap-3 px-0.5'>
        <Button
          variant='zero'
          className='aspect-square w-11'
          onClick={() => {
            router.push('/profile/' + post.author.username)
          }}
        >
          <Img
            imageUrl={post.author.profilePic.imageUrl}
            publicId={post.author.profilePic.publicId}
            height={50}
            width={50}
            className='aspect-square w-12 rounded-full'
          />
        </Button>
        <div className='flex flex-grow select-none items-center justify-between'>
          <div>
            <Button
              variant='zero'
              className='line-clamp-1 text-sm font-semibold leading-tight'
              onClick={() => {
                router.push('/profile/' + post.author.username)
              }}
            >
              {post.author.name}
            </Button>
            <div className='flex items-center gap-2 text-xs text-black/50 md:text-black/80'>
              <p className='line-clamp-1'>{post.author.username}</p>
              <p className='text-lg leading-3'>•</p>
              <p className=''>
                {new Date(post.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
          <Button variant='icon' className=''>
            {post.isMine ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className='p-2'>
                  <div>
                    <EllipsisVertical size={20} className='text-black' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='border border-black/10 bg-white/10 backdrop-blur-md dark:border-white/10 dark:bg-black/25'
                >
                  <DropdownMenuItem className='' onClick={() => {}}>
                    <Pencil size={17} className='mr-2' />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-red-500'>
                    <Trash2 size={17} className='mr-2' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <EllipsisVertical size={20} className='text-black' />
            )}
          </Button>
        </div>
      </div>
      <div
        className={`cursor-pointer px-1 text-xs font-medium text-black/80 sm:text-sm md:font-medium ${isExpanded ? '' : 'line-clamp-2'}`}
        onClick={toggleContent}
      >
        {post.text}
      </div>
      <div className=''>
        <Swiper
          spaceBetween={12}
          pagination={{
            clickable: false,
          }}
          autoplay={{
            delay: 3000,
          }}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
          className='rounded-xl'
          navigation
          scrollbar={{ draggable: true }}

          // slidesPerView={3}
        >
          {post.postImages.map((img, index) => (
            <SwiperSlide key={index} className='flex w-full items-center justify-center'>
              <div className='flex w-full items-center justify-center bg-black/5'>
                <PostImg imageUrl={img.imageUrl} alt='' publicId={img.publicId} />
              </div>
              <div className='absolute right-2 top-2 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white/80 sm:text-sm'>
                {index + 1} / {post.postImages.length}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='flex select-none items-center justify-between gap-5 pl-1 sm:px-2'>
        <div className='flex flex-grow items-center gap-4 text-sm font-medium text-black/50 md:text-black/50'>
          {isLiked ? (
            <Button
              variant='zero'
              className='flex cursor-pointer items-center gap-1.5 font-normal'
              onClick={() => {
                handleUnlike()
              }}
            >
              <Heart size={20} className='fill-current text-red-500' />
            </Button>
          ) : (
            <Button
              variant='zero'
              className='flex cursor-pointer items-center gap-1.5 font-normal'
              onClick={() => {
                handleLike()
              }}
            >
              <Heart size={20} className='' />
            </Button>
          )}
          <p className=''>{nFormatter(post.likes)}</p>
          <p className='hidden md:block'> {post.likes == 1 ? 'Like' : 'Likes'} </p>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant='zero' className='flex cursor-pointer items-center gap-1.5 font-normal'>
                <MessageSquareText size={20} className='' />
                <p className=''>{nFormatter(post.comments)}</p>
                <p className='hidden md:block'> {post.comments == 1 ? 'Comment' : 'Comments'} </p>
              </Button>
            </DrawerTrigger>
            <DrawerContent className={`wbackdrop-blur-3xl mx-auto min-h-[600px] max-w-[800px]`}>
              <Comments postId={post._id} />
            </DrawerContent>
          </Drawer>
        </div>
        <Button
          variant='zero'
          className={`cursor-pointer select-none rounded-full border-[0.5px] border-black/5 px-5 py-2 text-xs font-semibold ${colors[post.color as keyof typeof colors].button} text-black/45`}
          onClick={() => {
            const url = window.location.origin + '/post/' + post._id
            navigator.clipboard.writeText(url)
            setCopyLink(true)
            setTimeout(() => {
              setCopyLink(false)
            }, 2000)
          }}
        >
          <div className='flex items-center gap-1'>
            <Link size={16} className='' />
            {copyLink ? 'Link copied' : 'Copy link'}
          </div>
        </Button>
      </div>
    </div>
  )
}

export function Comments({ postId }: { postId: string }) {
  const [comment, setComment] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [comments, setComments] = useState<CommentT[]>([])
  const [nextLink, setNextLink] = useState('')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [isCommenting, setIsCommenting] = useState(false)
  const [totalComments, setTotalComments] = useState(0)
  const savedUser = useStore((state) => state.savedUser)
  const [reply, setReply] = useState({
    commentId: '',
    username: '',
  })
  const newReplay = newReply((state) => state.newReply)
  const setNewReplay = newReply((state) => state.setNewReply)

  async function handleComments() {
    const response = await getComments(postId)

    if (response.error) {
      console.log(response.error)
      return
    }
    setComments([...comments, ...response.comments])
    setNextLink(response.nextLink)
    setTotalComments(response.totalComments)
    console.log(response)
  }

  async function handleLoadMore() {
    if (!nextLink) return console.log('No more comments')

    try {
      const response = await axios.post(nextLink, {
        postId,
      }) // Change from post to get
      console.log(response)
      setComments([...comments, ...response.data.comments])
      setNextLink(response.data.nextLink)
      setTotalComments(response.data.totalComments)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function handleAddComment(postId: string, content: string) {
    if (!content) return
    setIsCommenting(true)
    if (reply.commentId) {
      try {
        const response = await axios.post('/api/activity/commentReply/createCommentReply', {
          content,
          commentId: reply.commentId,
        })
        console.log(response)
        setComment('')
        setReply({ commentId: '', username: '' })
        addReplay(response.data.commentReply)
      } catch (error: any) {
        console.error(error)
      }
    } else {
      try {
        const response = await axios.post('/api/activity/comment/createComment', { postId, content })
        console.log(response)
        const comment = response.data.comment
        addComment(comment)
        setComment('')
      } catch (error: any) {
        console.error(error)
      }
    }
    setIsCommenting(false)
  }

  function addComment(comment: any) {
    const newComment: CommentT = {
      _id: comment._id,
      userId: {
        profilePic: { imageUrl: savedUser.profilePic.imageUrl, publicId: savedUser.profilePic.publicId },
        _id: savedUser.id,
        name: savedUser.name,
        username: savedUser.username,
      },
      postId: comment.postId,
      content: comment.content,
      likes: comment.likes,
      isLiked: false,
      comments: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
    }

    setTotalComments(totalComments + 1)
    setComments([newComment, ...comments])
  }

  function addReplay(replay: any) {
    setTotalComments(totalComments + 1)

    console.log('comment id ', replay.commentId)

    setNewReplay({
      _id: replay._id,
      userId: {
        profilePic: { imageUrl: savedUser.profilePic.imageUrl, publicId: savedUser.profilePic.publicId },
        _id: savedUser.id,
        name: savedUser.name,
      },
      commentId: replay.commentId,
      postId: replay.postId,
      content: replay.content,
      likes: replay.likes,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      isLiked: false,
    })
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [comment])

  useEffect(() => {
    handleComments()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore()
        }
      },
      { threshold: 1 },
    )
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [nextLink])

  useEffect(() => {
    if (reply.commentId && textareaRef.current) {
      textareaRef.current.focus()
    }
    setComment('')
  }, [reply])

  return (
    <div className=''>
      <DrawerHeader className='w-full text-center font-extrabold'>
        <p>{totalComments == 0 ? 'Comments' : totalComments == 1 ? '1 Comment' : totalComments + ' Comments'}</p>
      </DrawerHeader>
      <div className='absolute bottom-0 left-auto grid w-full gap-2 border-t bg-white/60 px-2 py-3 pt-4 backdrop-blur-lg dark:bg-black/60'>
        {reply.username && (
          <div className='flex items-center justify-between px-5'>
            <div className='line-clamp-1 text-xs'>Replying to {reply.username}</div>
            <X
              size={20}
              className='cursor-pointer p-0.5'
              onClick={() => {
                setReply({ commentId: '', username: '' })
                setComment('')
              }}
            />
          </div>
        )}
        <div className='flex w-full items-center gap-1.5'>
          <div className='aspect-square w-8 rounded-full'>
            <Img
              imageUrl={savedUser.profilePic.imageUrl}
              publicId={savedUser.profilePic.publicId}
              height={40}
              width={40}
            />
          </div>
          <textarea
            ref={textareaRef}
            placeholder='Add a comment'
            className='no-scrollbar max-h-24 flex-grow rounded-3xl border border-black/5 px-3 py-2 text-[13px] repeat-infinite focus:outline-none dark:border-white/5 dark:bg-black dark:text-white'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isCommenting}
            rows={1}
          />
          <Button
            variant='zero'
            className='flex items-center gap-1 rounded-full border border-black/5 bg-accent px-4 py-1.5 text-xs font-semibold text-white'
            onClick={() => handleAddComment(postId, comment)}
          >
            {
              <div className='flex items-center gap-1'>
                <MessageSquareText size={18} className='' />
                {!isCommenting ? <div>Post</div> : <LoaderCircle size={18} className='animate-spin' />}
              </div>
            }
          </Button>
        </div>
      </div>
      <div className='grid max-h-[85dvh] gap-5 overflow-auto py-1 pb-24'>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} reply={reply} setReply={setReply} />
        ))}

        <div ref={loadMoreRef}></div>
      </div>
    </div>
  )
}

export function Comment({
  comment,
  reply,
  setReply,
}: {
  comment: CommentT
  reply: { commentId: string; username: string }
  setReply: React.Dispatch<React.SetStateAction<{ commentId: string; username: string }>>
}) {
  const [showReplies, setShowReplies] = useState(false)
  const [isLiked, setIsLiked] = useState(comment.isLiked)
  const [showMore, setShowMore] = useState(false)
  const [comments, setComments] = useState(comment.comments)
  const newReplay = newReply((state) => state.newReply)

  useEffect(() => {
    if (newReplay.commentId === comment._id) {
      comment.comments = comment.comments + 1
      setComments(comments + 1)
      setShowReplies(true)
    }
  }, [newReplay])

  async function handleLikeComment() {
    comment.likes = comment.likes + 1
    setIsLiked(true)
    const response = await likeComment(comment._id)
    if (response.error) {
      comment.likes = comment.likes - 1
      setIsLiked(false)
    }
  }

  async function handleUnlikeComment() {
    comment.likes = comment.likes - 1
    setIsLiked(false)
    const response = await unlikeComment(comment._id)
    if (response.error) {
      comment.likes = comment.likes + 1
      setIsLiked(true)
    }
  }

  return (
    <div className='flex flex-col items-start gap-3 px-5'>
      <div className='grid w-full gap-2'>
        <div className='flex w-full items-start justify-center gap-3'>
          <div className='aspect-square w-12 flex-grow-0 pt-1.5'>
            <Img
              imageUrl={comment.userId.profilePic.imageUrl}
              publicId={comment.userId.profilePic.publicId}
              height={50}
              width={50}
              className='aspect-square w-12 rounded-full'
            />
          </div>
          <div className='flex w-full justify-between gap-4 pr-2'>
            <div className='grid gap-1'>
              <div className='flex gap-3'>
                <div className='flex items-center justify-normal gap-1.5 text-xs'>
                  <p className='font-semibold'>{comment.userId.name}</p>
                  <p className='leading-none text-black/50 dark:text-white/50'>•</p>
                  <p className='text-[11px] text-black/50 dark:text-white/50'>
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                  </p>
                </div>
              </div>
              <div
                className={`cursor-pointer text-xs font-medium text-black/80 dark:text-white/80 sm:text-sm md:font-medium ${showMore ? '' : 'line-clamp-2'}`}
                onClick={() => setShowMore(!showMore)}
              >
                {comment.content}
              </div>
            </div>
            <div className='flex flex-col items-center justify-start gap-1 pt-1.5'>
              {isLiked ? (
                <Button
                  variant='icon'
                  className='text-xs font-semibold'
                  onClick={() => {
                    handleUnlikeComment()
                  }}
                >
                  <Heart size={18} className='fill-current text-red-500' />
                </Button>
              ) : (
                <Button
                  variant='icon'
                  className='text-xs font-semibold'
                  onClick={() => {
                    handleLikeComment()
                  }}
                >
                  <Heart size={18} className='' />
                </Button>
              )}
              <div className='text-[11px]'>{comment.likes}</div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-normal gap-1.5 px-12'>
          <Button
            variant='zero'
            className='text-xs font-semibold text-black/50 dark:text-white/60'
            onClick={() => {
              console.log(comment)

              setReply({
                commentId: comment._id,
                username: comment.userId.username,
              })
            }}
          >
            Reply
          </Button>
          {comment.comments > 0 && (
            <>
              <p className='leading-none text-black/50 dark:text-white/60'>•</p>
              <Button
                variant='zero'
                className='text-xs font-semibold text-black/50 dark:text-white/60'
                onClick={() => setShowReplies(!showReplies)}
              >
                {(showReplies ? 'Hide' : 'View') +
                  ' ' +
                  comment.comments +
                  ' ' +
                  (comment.comments == 1 ? 'Reply' : 'Replies')}
              </Button>
            </>
          )}
        </div>
      </div>
      {showReplies && <CommentReplays commentId={comment._id} />}
    </div>
  )
}

export function CommentReplays({ commentId }: { commentId: string }) {
  const [replays, setReplays] = useState<CommentReplaysT[]>([])
  const [showMore, setShowMore] = useState(false)
  const [nextLink, setNextLink] = useState('')
  const newReplay = newReply((state) => state.newReply)
  const clearNewReplay = newReply((state) => state.clearNewReply)

  useEffect(() => {
    if (newReplay.commentId === commentId) {
      setReplays([newReplay, ...replays])
      clearNewReplay()
    }
  }, [newReplay])

  async function getCommentsReplays() {
    try {
      const response = await axios.post('/api/post/getCommentReplays', {
        commentId,
      })
      setReplays(response.data.commentReplays)
      setNextLink(response.data.nextLink)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function handleLoadMore() {
    if (!nextLink) return console.log('No more comments')
    try {
      const response = await axios.post(nextLink, {
        commentId,
      })
      console.log(response)
      setReplays([...replays, ...response.data.commentReplays])
      setNextLink(response.data.nextLink)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCommentsReplays()
  }, [commentId]) // Add commentId as a dependency

  return (
    <div className='grid w-full gap-3.5 pb-2 pl-10 pt-0.5'>
      {replays.map((replay, index) => (
        <CommentReplay key={index} {...replay} />
      ))}
      <div className='px-3'>
        {nextLink ? (
          <Button
            variant='zero'
            className='text-xs font-semibold text-black/50 dark:text-white/60'
            onClick={handleLoadMore}
          >
            View more
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export function CommentReplay(replay: CommentReplaysT) {
  const [isLiked, setIsLiked] = useState(replay.isLiked)
  const [likes, setLikes] = useState(replay.likes)
  const [showMore, setShowMore] = useState(false)

  async function handleLikeReplay() {
    setLikes(likes + 1)
    setIsLiked(true)
    const response = await likeReplay(replay._id)
    if (response.error) {
      setLikes(likes)
      setIsLiked(false)
    }
    console.log(response)
  }

  async function handleUnLikeReplay() {
    setLikes(likes - 1)
    setIsLiked(false)
    const response = await unlikeReplay(replay._id)
    if (response.error) {
      setLikes(likes)
      setIsLiked(true)
    }
    console.log(response)
  }
  return (
    <div className='flex w-full items-start justify-center gap-3'>
      <div className='aspect-square w-12 flex-grow-0 pt-1.5'>
        <Img
          imageUrl={replay.userId.profilePic.imageUrl}
          publicId={replay.userId.profilePic.publicId}
          height={50}
          width={50}
          className='aspect-square w-12 rounded-full'
        />
      </div>
      <div className='flex w-full justify-between gap-4 pr-2'>
        <div className='grid gap-1'>
          <div className='flex gap-3'>
            <div className='flex items-center justify-normal gap-1.5 text-xs'>
              <p className='font-semibold'>{replay.userId.name}</p>
              <p className='leading-none text-black/50'>•</p>
              <p className='text-[11px] text-black/50'>12:20 </p>
            </div>
          </div>
          <div
            className={`cursor-pointer text-xs font-medium text-black/80 dark:text-white/80 sm:text-sm md:font-medium ${showMore ? '' : 'line-clamp-2'}`}
            onClick={() => setShowMore(!showMore)}
          >
            {replay.content}
          </div>
        </div>
        <div className='flex flex-col items-center justify-start gap-1 pt-1.5'>
          {isLiked ? (
            <Button
              variant='icon'
              className='text-xs font-semibold'
              onClick={() => {
                handleUnLikeReplay()
              }}
            >
              <Heart size={18} className='fill-current text-red-500' />
            </Button>
          ) : (
            <Button
              variant='icon'
              className='text-xs font-semibold'
              onClick={() => {
                handleLikeReplay()
              }}
            >
              <Heart size={18} className='' />
            </Button>
          )}
          <div className='text-[11px]'>{likes}</div>
        </div>
      </div>
    </div>
  )
}
