import { create } from 'zustand'
import { TokenDataT } from '@/lib/types'
import { errorToJSON } from 'next/dist/server/render'
import { ls } from '@/lib/ls'

interface StoreT {
  savedUser: savedUserT
  setSavedUser: (data: savedUserT) => void
  clearSavedUser: () => void
}

interface savedUserT {
  email: string
  name: string
  username: string
  id: string
  isVerified: boolean
  profilePic: {
    imageUrl: string
    publicId: string
  }
}

const useStore = create<StoreT>((set) => {
  const savedUser = JSON.parse(ls.get('savedUser') || '{}')

  return {
    savedUser,
    setSavedUser: (data: savedUserT) => {
      set({ savedUser: data })
      ls.set('savedUser', JSON.stringify(data))
    },
    clearSavedUser: () => {
      set({
        savedUser: {
          email: '',
          name: '',
          username: '',
          id: '',
          isVerified: false,
          profilePic: { imageUrl: '', publicId: '' },
        },
      })
      ls.clear()
    },
  }
})

export default useStore

// // Default initial state
// const defaultUser: TokenDataT = {
//   email: '',
//   username: '',
//   id: '',
//   isVerified: false,
// }

// // Create the Zustand store
// const useUserStore = create((set) => {
//   // Load data from localStorage on initialization
//   const storedUser = localStorage.getItem('savedUser') : null

//   return {
//     savedUser: storedUser ? JSON.parse(storedUser) : defaultUser,
//     setSavedUser: (data: TokenDataT) => {
//       set({ savedUser: data })
//       if (typeof window !== 'undefined') {
//         if (data?.isVerified) {
//           localStorage.setItem('savedUser', JSON.stringify(data))
//         }
//       }
//     },
//     clearSavedUser: () => {
//       set({ savedUser: defaultUser })
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('savedUser')
//       }
//     },
//   }
// })

// export default useUserStore

// export interface StoreT {
//   savedUser: TokenDataT
//   setSavedUser: (data: TokenDataT) => void
//   clearSavedUser: () => void
// }
