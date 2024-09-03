'use client'
// import React, { useState } from 'react'

import { ReactNode, useState } from 'react'

// const Popup = () => {
//   const [isOpen, setIsOpen] = useState(false)

//   const toggleDrawer = () => setIsOpen(!isOpen)

//   return (
//     <>
//       <button onClick={toggleDrawer} className='bottom-4 left-4 z-50 rounded bg-blue-500 p-2 text-white'>
//         {isOpen ? 'Close' : 'Open'} Drawer
//       </button>
//       {isOpen && <div className='fixed inset-0 z-40 bg-black/50' onClick={toggleDrawer}></div>}
//       <div
//         className={`fixed bottom-0 left-0 w-full bg-white transition-transform duration-300 dark:bg-black ${isOpen ? 'translate-y-0' : 'translate-y-full'} z-50`}
//       >
//         <div className='p-4'>
//           {/* Drawer content */}
//           <p>Drawer Content Here</p>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Popup

type PopupProps = {
  button: ReactNode
  children: ReactNode
  closeButton?: ReactNode
}

export default function Popup({ button, children, closeButton }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <>
      <button onClick={toggleDrawer} className='relative'>
        {button}
      </button>
      {isOpen && (
        <div className='fixed inset-0 z-40 bg-black/50 transition-transform duration-300' onClick={toggleDrawer}></div>
      )}
      <div
        className={`left-1/2 z-50 flex w-[80%] flex-grow items-center justify-center border-2 border-black bg-white transition-transform duration-300 dark:bg-black ${isOpen ? 'absolute' : 'hidden'}`}
      >
        <div className='w-full p-4'>{children}</div>
      </div>
    </>
  )
}
// export default function Popup({
//   button,
//   children,
//   closeButton,
// }: {
//   button: React.ReactNode
//   children: React.ReactNode
//   closeButton?: React.ReactNode
// }) {
//   const [isOpen, setIsOpen] = useState(false)

//   const toggleDrawer = () => setIsOpen(!isOpen)

//   return (
//     <>
//       <button
//         onClick={toggleDrawer}
//         className='relative bg-red-300'
//         onAuxClick={() => {
//           console.log('clicked insode')
//         }}
//       >
//         {button}
//       </button>
//       {/* {isOpen && (
//         <div
//           className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
//           onClick={() => {
//             console.log('clicked')

//             setIsOpen(!isOpen)
//           }}
//         >
//           <div
//             className='w-full max-w-md border-2 border-black bg-white p-4 dark:bg-black'
//             onClick={(e) => e.stopPropagation()} // Prevent click inside the popup from closing it
//           >
//             {closeButton && (
//               <div className='flex justify-end'>
//                 <button onClick={toggleDrawer}>{closeButton}</button>
//               </div>
//             )}
//             <div>{children}</div>
//           </div>
//         </div>
//       )} */}
//     </>
//   )
// }
