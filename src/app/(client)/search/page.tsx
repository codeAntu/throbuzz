/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Img from '@/components/Img'
import { Screen0 } from '@/components/Screen'
import { ChevronLeft, Search, ServerCrash, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'

export default function Page() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const [page, setPage] = useState('Accounts')
  const pages = ['Accounts', 'Posts']
  const [searchResults, setSearchResults] = useState([])
  const [searchedItems, setSearchedItems] = useState(['test 1', 'test 2', 'ediehfnubj'])
  const [searched, setSearched] = useState(true)

  return (
    <Screen0 className='flex flex-col gap-2'>
      <div className='sticky top-0 z-10 flex min-h-3 w-full items-center justify-between border-b border-black/5 bg-white/80 py-1.5 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
        <Button
          variant='icon'
          className='rounded-full p-3 active:bg-black/10 dark:active:bg-white/10'
          onClick={() => {
            router.back()
          }}
        >
          <ChevronLeft size={24} />
        </Button>
        <div className='flex w-full items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-2.5 dark:border-white/5 dark:bg-white/5'>
          <Search size={24} className='h-6 w-6 text-black/40 dark:text-white/40' strokeWidth={1.5} />
          <input
            type='text'
            name=''
            id=''
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearched(false)
              }
            }}
            className='w-full bg-transparent py-2 text-sm outline-none placeholder:text-black/30 dark:placeholder:text-white/30'
            placeholder='Search'
          />
          {search.length > 0 && (
            <X
              size={24}
              className='h-6 w-6 cursor-pointer text-black/40 dark:text-white/40'
              strokeWidth={1.5}
              onClick={() => {
                setSearch('')
                setSearched(true)
              }}
            />
          )}
        </div>
      </div>
      {searched ? (
        <div className='space-y-2 px-5'>
          <div className='flex justify-between px-1 text-xs font-semibold'>
            <div>Recent Searches</div>
            <div className='text-accent'>See all </div>
          </div>
          <div>
            {searchedItems.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between border-black/10 p-2 text-xs font-medium dark:border-white/10'
              >
                <div
                  className='flex w-full items-center gap-1.5'
                  onClick={() => {
                    setSearch(item)
                    setSearched(false)
                  }}
                >
                  <Search
                    size={36}
                    className='rounded-full border border-gray-700 bg-black/20 p-2.5'
                    strokeWidth={1.5}
                  />
                  <div>{item}</div>
                </div>
                <X size={18} className='cursor-pointer text-black/40 dark:text-white/40' strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className='flex items-center justify-around'>
            {pages.map((item, index) => (
              <Button
                key={index}
                variant='text'
                className={`px-4 text-xs font-bold text-black/50 dark:text-white/50 sm:text-sm ${page === item ? 'rounded-none border-b-2 border-black text-black dark:border-white dark:text-white' : ''} `}
                onClick={() => {
                  setPage(item)
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          <div>
            {
              {
                Accounts: <Account />,
                Posts: <Posts />,
              }[page]
            }
          </div>
        </>
      )}
    </Screen0>
  )
}

function Account() {
  return (
    <Screen0 className='gap-5'>
      <div className='text-sm font-semibold'>You may know</div>
      <div className='grid gap-5 sm:gap-7'></div>
    </Screen0>
  )
}

function Posts() {
  return (
    <Screen0 className='gap-5'>
      <div className='text-lg font-semibold'>Posts</div>
      <div className='grid gap-5 sm:gap-7'></div>
    </Screen0>
  )
}
