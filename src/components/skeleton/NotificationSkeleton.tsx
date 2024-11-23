export default function NotificationSkeleton() {
  return (
    <div className='flex animate-pulse items-center gap-1 rounded-xl py-2 pl-3 pr-3'>
      <div className='flex flex-grow items-center gap-3'>
        <div className='aspect-square w-12 flex-grow-0 rounded-full bg-gray-100 p-3 dark:bg-zinc-900'></div>
        <div className='w-full flex-grow'>
          <div className='mb-2 h-4 w-3/4 rounded bg-gray-100 dark:bg-zinc-900'></div>
          <div className='h-4 w-1/2 rounded bg-gray-100 dark:bg-zinc-900'></div>
        </div>
      </div>
    </div>
  )
}
