import React, { useState } from 'react'

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <>
      <button className='fixed left-4 top-4 z-50 rounded bg-blue-500 p-2 text-white' onClick={toggleDrawer}>
        {isOpen ? 'Close' : 'Open'} Drawer
      </button>
      {isOpen && <div className='fixed inset-0 z-40 bg-black bg-opacity-50' onClick={toggleDrawer}></div>}
      <div
        className={`fixed top-0 ${isOpen ? 'left-0' : '-left-full'} z-40 h-full w-64 bg-white shadow-md transition-all duration-300`}
      >
        {/* Drawer content goes here */}
        <div className='p-4'>
          <h2 className='text-lg font-semibold'>Drawer Title</h2>
          <p>Content...</p>
        </div>
      </div>
    </>
  )
}
