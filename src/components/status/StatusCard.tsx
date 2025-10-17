import { useState } from 'react'
import StatusViewer from './StatusViewer'

type StatusCardProps = {
  status: {
    _id: string
    text?: string
    image?: { publicId: string; imageUrl: string }
    user?: {
      name?: string
      username?: string
      profileImage?: string
    }
    // Add optional statuses and index for stories navigation
    statuses?: any[]
    statusIndex?: number
  }
}

export default function StatusCard({ status }: StatusCardProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className='relative flex aspect-[9/16] h-56 cursor-pointer flex-col justify-end overflow-hidden rounded-xl bg-zinc-900 shadow-md'
        onClick={() => setOpen(true)}
      >
        {/* Blurred colored overlay */}
        <div className='absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-br from-blue-700/60 via-purple-700/40 to-pink-600/40 backdrop-blur-sm'></div>
        {status.image && (
          <img
            src={status.image.imageUrl}
            alt='status-img'
            className='absolute left-0 top-0 z-10 h-full w-full rounded-xl object-cover'
            style={{ filter: 'blur(0px)' }}
          />
        )}
        {status.text && (
          <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center px-3 text-center'>
            <span
              className={`line-clamp-3 break-words rounded bg-black/40 p-2 font-semibold text-white drop-shadow-lg`}
              style={{
                fontSize:
                  status.text.length < 40
                    ? '1.25rem' // text-lg
                    : status.text.length < 100
                      ? '1rem' // text-base
                      : '0.875rem', // text-sm
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxHeight: '4.5em', // ~3 lines
              }}
            >
              {status.text}
            </span>
          </div>
        )}
        <div className='absolute bottom-2 left-1/2 z-30 line-clamp-1 flex max-w-[90%] -translate-x-1/2 items-center gap-1 rounded-full bg-black/60 px-1.5 py-1 backdrop-blur-sm'>
          <img
            src={status.user?.profileImage}
            alt='user-avatar'
            className='h-7 w-7 rounded-full border border-white bg-zinc-800 object-cover'
          />
          <div className='line-clamp-1 text-xs text-zinc-300'>@{status.user?.username}</div>
        </div>
      </div>
      {/* Pass all statuses and current index if available */}
      {status.statuses && typeof status.statusIndex === 'number' ? (
        <StatusViewer
          open={open}
          onClose={() => setOpen(false)}
          statuses={status.statuses}
          initialIndex={status.statusIndex}
          user={status.user}
        />
      ) : (
        <StatusViewer
          open={open}
          onClose={() => setOpen(false)}
          statuses={[status]}
          initialIndex={0}
          user={status.user}
        />
      )}
    </>
  )
}
