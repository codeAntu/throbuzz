import { ls } from '@/lib/ls'
import { create } from 'zustand'

interface SearchHistoryT {
  searchHistory: string[]
  setSearchHistory: (data: string[]) => void
  addSearchHistory: (data: string) => void
  removeSearchHistory: (data: string) => void
  clearSearchHistory: () => void
}

const useSearchHistory = create<SearchHistoryT>((set) => {
  const searchHistory = JSON.parse(ls.get('searchHistory') || '[]')

  return {
    searchHistory,
    setSearchHistory: (data: string[]) => {
      set({ searchHistory: data })
      localStorage.setItem('searchHistory', JSON.stringify(data))
    },
    addSearchHistory: (data: string) => {
      if (searchHistory.includes(data)) {
        return
      }
      // if (searchHistory.length >= 10) {
      //   searchHistory.pop()
      // }
      const newSearchHistory: string[] = [data, ...searchHistory]
      set({ searchHistory: newSearchHistory })
      ls.set('searchHistory', JSON.stringify(newSearchHistory))
    },
    removeSearchHistory: (data: string) => {
      const newSearchHistory: string[] = searchHistory.filter((item: string) => item !== data)
      set({ searchHistory: newSearchHistory })
      ls.set('searchHistory', JSON.stringify(newSearchHistory))
    },
    clearSearchHistory: () => {
      set({ searchHistory: [] })
      ls.clear()
    },
  }
})

export default useSearchHistory
