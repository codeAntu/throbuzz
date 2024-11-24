import { Button } from '../Button'
import Header from '../Header'
import { Screen0 } from '../Screen'

export default function EditProfileSkeleton() {
  return (
    <Screen0 className='animate-pulse'>
      <Header title='Edit Profile'>
        <Button variant='zero' className='rounded-full p-3 text-sm text-accent dark:text-accent md:p-3'>
          <div>Save</div>
        </Button>
      </Header>

      <div className='flex flex-grow flex-col justify-between gap-8 px-5 py-6'>
        <div>
          <div className='flex flex-col justify-center gap-2.5'>
            <div className='flex flex-col items-center justify-center gap-2 sm:gap-4'>
              <div className='w-1/3'>
                <div className='aspect-square rounded-full bg-gray-100 dark:bg-zinc-900'></div>
              </div>
              <div className='flex h-8 w-28 gap-2 rounded-full border-2 border-none bg-gray-100 px-7 py-2 dark:bg-zinc-900'></div>
            </div>
            <div className='space-y-2'>
              <div className='h-6 w-20 rounded-sm bg-gray-100 px-1.5 text-base font-medium dark:bg-zinc-900'></div>
              <div className='h-9 w-full rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
            </div>
            <div className='space-y-2'>
              <div className='h-6 w-20 rounded-sm bg-gray-100 px-1.5 text-base font-medium dark:bg-zinc-900'></div>
              <div className='h-9 w-full rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
            </div>

            <div className='space-y-2 pt-2'>
              <div className='h-6 w-20 rounded-sm bg-gray-100 px-1.5 text-base font-medium dark:bg-zinc-900'></div>
              <div className='grid gap-3 rounded-md border border-slate-400/15 bg-gray-100 px-3 py-4 dark:bg-zinc-950'>
                <div className='h-6 w-full rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                <div className='h-6 w-full rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
              </div>
            </div>
            <div className='space-y-2 pt-2'>
              <div className='h-6 w-20 rounded-sm border-slate-400/15 bg-gray-100 px-1.5 text-base font-medium dark:bg-zinc-900'></div>
              <div className='grid gap-3 rounded-md border bg-gray-100 px-3 py-4 dark:bg-zinc-950'>
                <div className='flex items-center gap-3'>
                  <div className='h-6 w-20 rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                  <div className='h-6 w-full rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='h-6 w-20 rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                  <div className='h-6 w-full rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                </div>
              </div>
            </div>
            <div className='space-y-2 pt-2'>
              <div className='h-6 w-20 rounded-sm bg-gray-100 px-1.5 text-base font-medium dark:bg-zinc-900'></div>
              <div className='grid gap-3 rounded-md border border-slate-400/15 bg-gray-100 px-3 py-4 dark:bg-zinc-950'>
                <div className='flex items-center gap-3'>
                  <div className='h-6 w-20 rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                  <div className='h-6 w-full rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='h-6 w-20 rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                  <div className='h-6 w-full rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='h-6 w-20 rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                  <div className='h-6 w-full rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='h-6 w-20 rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                  <div className='h-6 w-full rounded-[8px] bg-gray-200/70 dark:bg-zinc-900'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen0>
  )
}
