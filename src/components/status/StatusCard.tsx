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
  }
}

export default function StatusCard({ status }: StatusCardProps) {
  return (
    <div className='relative flex aspect-[9/16] h-56 flex-col justify-end overflow-hidden rounded-xl bg-zinc-900 shadow-md'>
      {status.image && (
        <img
          src={status.image.imageUrl}
          alt='status-img'
          className='absolute left-0 top-0 h-full w-full rounded-xl object-cover'
        />
      )}
      {status.text && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center px-3 text-center'>
          <span className='rounded bg-black/40 p-2 text-lg font-semibold text-white drop-shadow-lg'>{status.text}</span>
        </div>
      )}
      <div className='absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/60 px-2 py-1'>
        <img
          src={status.user?.profileImage}
          alt='user-avatar'
          className='h-7 w-7 rounded-full border border-white bg-zinc-800 object-cover'
        />
        <div className='line-clamp-1 text-xs text-zinc-300'>@{status.user?.username}</div>
      </div>
    </div>
  )
}
