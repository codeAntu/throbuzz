import loading from '@/app/(client)/(user)/profile/[userName]/loading'
import { deletePost } from '@/handelers/post/deletePost'
import { DialogClose } from '@radix-ui/react-dialog'
import { LoaderCircle, Trash2 } from 'lucide-react'
import router from 'next/router'
import { Button } from './Button'
import { MyDialog } from './MyDialog'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeletePost({
  postId,
  goto,
  trigger,
}: {
  postId: string
  goto: string

  trigger: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <MyDialog trigger={trigger}>
      <div className='pt-5 text-center text-lg'>Do you want to delete the post</div>
      <div className='pb-3 text-center text-xs text-black/50 dark:text-white/50'>
        If you delete the post, it will be permanently removed from your account. This cannot be undone.
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <Button
          variant='filled'
          className='border-red-500 bg-red-500 text-white dark:border-red-500 dark:bg-red-500 dark:text-white'
          onClick={async () => {
            setLoading(true)
            const res = await deletePost(postId)
            setLoading(false)
            if (res.error) {
              console.log(res.error)
              return
            }
            if (goto === 'back') router.back()
            else {
              console.log('goto', goto)
              // router.refresh()
              // router.push(goto)
              window.location.reload()
            }
          }}
        >
          Delete{' '}
          {loading && <LoaderCircle size={18} className='animate-spin text-white dark:text-white' strokeWidth={2} />}
        </Button>
        <DialogClose>
          <Button variant='filled' className=''>
            Cancel
          </Button>
        </DialogClose>
      </div>
    </MyDialog>
  )
}
