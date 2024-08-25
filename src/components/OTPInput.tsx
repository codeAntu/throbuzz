'use client'

import { useState } from 'react'

export default function OTPInput(length = 6, getOTp = () => {}) {
  const [otp, setOtp] = useState(new Array(length).fill(''))

  return (
    <div className='flex flex-col items-center justify-center gap-3.5'>
      {otp.map((data, i) => (
        <input
          key={i}
          type='text'
          maxLength={1}
          value={data}
          onChange={(e) => {}}
          onFocus={(e) => e.target.select()}
          className='h-10 w-10 rounded-lg border border-black/10 text-center text-2xl font-semibold text-black'
        />
      ))}
    </div>
  )
}
