// import React, { useState } from 'react'

// export default function Drawer() {
//   const [isOpen, setIsOpen] = useState(false)

//   const toggleDrawer = () => setIsOpen(!isOpen)

//   return (
//     <>
//       <button className='bottom-4 rounded bg-blue-500 text-white' onClick={toggleDrawer}>
//         {isOpen ? 'Close' : 'Open'} Drawer
//       </button>
//       {isOpen && (
//         <div className='fixed inset-0 z-40 bg-black/50 transition-transform duration-500' onClick={toggleDrawer}></div>
//       )}
//       <div
//         className={`absolute bottom-0 left-0 ${isOpen ? 'translate-y-0' : 'translate-y-[100%]'} z-50 w-full bg-transparent transition-transform duration-300`}
//       >
//         {/* Drawer content goes here */}
//         <div className='rounded-t-3xl bg-white dark:bg-black'>
//           <div className='flex w-full items-center justify-center py-3'>
//             <div className='h-2.5 w-28 rounded-full bg-black/70 dark:bg-white/70'></div>
//           </div>
//           <div>Helo</div>
//           <div>Helo</div>
//           <div>Helo</div>
//           <div>Helo</div>
//           <div>Helo</div>
//           <div>Helo</div>
//         </div>
//       </div>
//     </>
//   )
// }

import React, { useState } from 'react'

const SimpleDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        className='fixed bottom-4 right-4 z-30 rounded bg-blue-500 p-2 text-white'
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle Drawer
      </button>

      {isOpen && <div className='fixed inset-0 z-20 bg-black bg-opacity-50' onClick={() => setIsOpen(false)}></div>}

      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white p-4 shadow-lg transition-transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <h2 className='text-lg font-semibold'>Drawer Title</h2>
        <p>Here's some content for the drawer...</p>
        <button className='mt-4 rounded bg-red-500 p-2 text-white' onClick={() => setIsOpen(false)}>
          Close Drawer
        </button>
      </div>
    </div>
  )
}

export default SimpleDrawer
