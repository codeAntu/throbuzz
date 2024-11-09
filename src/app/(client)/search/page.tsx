/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import People, { PeopleT } from '@/components/people'
import Post, { PostT } from '@/components/Post'
import { Screen0 } from '@/components/Screen'
import axios from 'axios'
import { ChevronLeft, Search, ServerCrash, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const [page, setPage] = useState('Accounts')
  const pages = ['Accounts', 'Posts']
  const [searchedItems, setSearchedItems] = useState(['test 1', 'test 2', 'ediehfnubj'])
  const [searched, setSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  return (
    <Screen0 className='flex flex-col gap-2'>
      <div className='sticky top-0 z-10 flex min-h-3 w-full items-center justify-between border-b border-black/5 bg-white/80 py-1.5 pr-5 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
        <Button
          variant='icon'
          className='rounded-full p-3 active:bg-black/10 dark:active:bg-white/10'
          onClick={() => {
            if (isSearching || searched) {
              setIsSearching(false)
              setSearched(false)
              setSearch('')
            } else {
              router.back()
            }
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
              if (e.target.value.length > 2) {
                setSearched(true)
                setIsSearching(false)
              } else {
                setSearched(false)
                setIsSearching(true)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearched(true)
                setIsSearching(false)
              }
            }}
            onClick={() => {
              if (!searched) {
                setIsSearching(true)
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
                // setSearched(false)
                setIsSearching(false)
              }}
            />
          )}
        </div>
      </div>

      {!isSearching && !searched ? (
        <Suggestions />
      ) : isSearching ? (
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
                Accounts: <Account search={search} />,
                Posts: <Posts search={search} />,
              }[page]
            }
          </div>
        </>
      )}
    </Screen0>
  )
}

function Account({ search }: { search: string }) {
  const [searchResults, setSearchResults] = useState<PeopleT[] | []>([])
  const [totalSearchResults, setTotalSearchResults] = useState(0)

  async function getSearchRes() {
    try {
      const res = await axios.post('api/search/user', { search })
      setTotalSearchResults(res.data.totalUsers)
      setSearchResults(res.data.users)
    } catch (error: any) {
      console.error('Error fetching search results:', error)
    }
  }

  console.log(searchResults)

  useEffect(() => {
    if (search.length > 2) {
      const timeout = setTimeout(() => {
        console.log('searching')

        getSearchRes()
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [search])

  return (
    <Screen0 className='gap-5 p-5'>
      <div className='grid gap-5 sm:gap-7'>
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => <People key={index} people={item} />)
        ) : (
          <div className='flex items-center justify-center gap-2'>
            <ServerCrash size={24} />
            <div className='text-sm font-medium'>No results found</div>
          </div>
        )}
      </div>
    </Screen0>
  )
}

function Posts({ search }: { search: string }) {
  const [searchResults, setSearchResults] = useState<PostT[] | []>([])
  const [totalSearchResults, setTotalSearchResults] = useState(0)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  async function getSearchRes() {
    try {
      const res = await axios.post('api/search/post', { search })
      setTotalSearchResults(res.data.total)
      setSearchResults(res.data.posts)
      setNextPageUrl(res.data.nextPageUrl)
      console.log(res.data.posts)
    } catch (error: any) {
      console.error('Error fetching search results:', error)
    }
  }

  async function getNewPage() {
    try {
      const res = await axios.post(nextPageUrl, { search })
      setTotalSearchResults(res.data.total)
      setSearchResults([...searchResults, ...res.data.posts])
      setNextPageUrl(res.data.nextPageUrl)
    } catch (error: any) {
      console.error('Error fetching search results:', error)
    }
  }

  console.log(searchResults)
  // console.log('total ', totalSearchResults)

  useEffect(() => {
    if (search.length > 2) {
      const timeout = setTimeout(() => {
        console.log('searching')

        getSearchRes()
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [search])

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getNewPage()
        }
      })
      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [ref])

  return (
    <Screen0 className='gap-5 px-5'>
      <div className='grid gap-5 sm:gap-7'></div>
      {searchResults.length > 0 ? (
        searchResults.map((item, index) => <Post key={index} post={item} />)
      ) : (
        <div className='flex items-center justify-center gap-2'>
          <ServerCrash size={24} />
          <div className='text-sm font-medium'>No results found</div>
        </div>
      )}
      <div ref={ref}></div>
    </Screen0>
  )
}

function Suggestions() {
  return (
    <Screen0 className='gap-5'>
      <div className='text-lg font-semibold'>Suggestions</div>
      <div className='grid gap-5 sm:gap-7'></div>
    </Screen0>
  )
}
