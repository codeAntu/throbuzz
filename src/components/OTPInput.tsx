'use client'

import { useEffect, useRef, useState } from 'react'

export default function OTPInput({ length = 6, getOTp }: { length?: number; getOTp: (otp: string) => void }) {
  const [otp, setOtp] = useState(new Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null))

  function handleOtpChange(e: any, index: number) {
    const value = e.target.value
    if (isNaN(value)) return
    const otpCopy = [...otp]
    otpCopy[index] = value.slice(-1)
    setOtp(otpCopy)

    const combinedOtp = otpCopy.join('')
    if (combinedOtp.length === length) getOTp(combinedOtp)

    if (value && index < length - 1 && inputRefs.current[index + 1]) inputRefs.current[index + 1]?.focus()
  }

  function handleOtpKeyDown(e: any, index: number) {
    if (e.key === 'Backspace' && index > 0 && !otp[index] && inputRefs.current[index - 1]) {
      const otpCopy = [...otp]
      otpCopy[index - 1] = ''
      setOtp(otpCopy)
      if (inputRefs.current[index - 1]) inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasteData = e.clipboardData.getData('text').trim()
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault()
      return
    }
    const newOtp = pasteData.split('').slice(0, length)
    setOtp(newOtp)
    getOTp(newOtp.join(''))
    newOtp.forEach((value, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = value
      }
    })
    if (inputRefs.current[length - 1]) {
      inputRefs.current[length - 1]?.focus()
    }
  }

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className='flex w-full items-center justify-around'>
      {otp.map((data, i) => (
        <input
          key={i}
          type='number'
          ref={(el) => {
            inputRefs.current[i] = el
          }}
          value={data}
          onChange={(e) => handleOtpChange(e, i)}
          onKeyDown={(e) => handleOtpKeyDown(e, i)}
          onPaste={handlePaste}
          className='aspect-square w-14 rounded-lg border border-black/10 text-center text-lg font-medium text-black caret-transparent dark:border-white/10 dark:bg-black dark:text-white'
        />
      ))}
    </div>
  )
} // 'use client'

// import { useEffect, useRef, useState } from 'react'

// export default function OTPInput({ length = 6, getOTp }: { length?: number; getOTp: (otp: string) => void }) {
//   const [otp, setOtp] = useState(new Array(length).fill(''))
//   const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null))
//   function handleOtpChange(e: any, index: number) {
//     const value = e.target.value
//     if (isNaN(value)) return
//     const otpCopy = [...otp]
//     otpCopy[index] = value.slice(-1)
//     setOtp(otpCopy)

//     const combinedOtp = otpCopy.join('')
//     if (combinedOtp.length === length) getOTp(combinedOtp)

//     if (value && index < length - 1 && inputRefs.current[index + 1]) inputRefs.current[index + 1]?.focus()
//   }

//   function handleOtpKeyDown(e: any, index: number) {
//     if (e.key === 'Backspace' && index > 0 && !otp[index] && inputRefs.current[index - 1]) {
//       const otpCopy = [...otp]
//       otpCopy[index - 1] = ''
//       setOtp(otpCopy)
//       if (inputRefs.current[index - 1]) inputRefs.current[index - 1]?.focus()
//     }
//   }

//   useEffect(() => {
//     if (inputRefs.current[0]) inputRefs.current[0]?.focus()
//   }, [])

//   return (
//     <div className='flex w-full items-center justify-around'>
//       {otp.map((data, i) => (
//         <input
//           key={i}
//           type='number'
//           ref={(el) => {
//             inputRefs.current[i] = el
//           }}
//           maxLength={1}
//           value={data}
//           onChange={(e) => {
//             handleOtpChange(e, i)
//           }}
//           onFocus={(e) => e.target.select()}
//           onKeyDown={(e) => handleOtpKeyDown(e, i)}
//           className='aspect-square w-14 rounded-lg border border-black/10 text-center text-2xl font-semibold text-black caret-transparent'
//         />
//       ))}
//     </div>
//   )
// }
