// // components/ClientProvider.tsx
// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// const ClientProvider = () => {
//   const router = useRouter()

//   useEffect(() => {
//     const handleStart = () => {
//       NProgress.start()
//       console.log('start')
//     }
//     const handleStop = () => {
//       NProgress.done()
//       console.log('stop')
//     }

//     router.events.on('routeChangeStart', handleStart)
//     router.events.on('routeChangeComplete', handleStop)
//     router.events.on('routeChangeError', handleStop)

//     return () => {
//       router.events.off('routeChangeStart', handleStart)
//       router.events.off('routeChangeComplete', handleStop)
//       router.events.off('routeChangeError', handleStop)
//     }
//   }, [router])

//   return null // No UI for this component
// }

// export default ClientProvider

'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const ClientProvider = () => {
  const pathname = usePathname() // Get the current pathname
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      NProgress.start() // Start progress bar
      previousPathname.current = pathname

      // Stop the progress bar after a short delay
      setTimeout(() => {
        NProgress.done()
      }, 300) // Adjust delay as needed
    }
  }, [pathname])

  return null // This component does not render anything
}

export default ClientProvider
