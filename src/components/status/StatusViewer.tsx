import { X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export type StatusViewerProps = {
  open: boolean
  onClose: () => void
  statuses: Array<{
    text?: string
    image?: { imageUrl: string }
  }>
  initialIndex?: number
  user?: { name?: string; username?: string; profileImage?: string }
}

const STATUS_DURATION = 4000 // 4 seconds per status

export default function StatusViewer({ open, onClose, statuses, initialIndex = 0, user }: StatusViewerProps) {
  const [current, setCurrent] = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    if (open) {
      setCurrent(initialIndex)
      setProgress(0)
      setStartTime(Date.now())
    }
  }, [open, initialIndex])

  useEffect(() => {
    if (!open) return
    setProgress(0)
    setStartTime(Date.now())

    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / STATUS_DURATION) * 100, 100)
      setProgress(newProgress)

      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (current < statuses.length - 1) setCurrent((c) => c + 1)
      else onClose()
    }, STATUS_DURATION)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [open, current, statuses.length, onClose, startTime])

  // Navigation handlers
  const goNext = () => {
    timerRef.current && clearTimeout(timerRef.current)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    if (current < statuses.length - 1) setCurrent((c) => c + 1)
    else onClose()
  }
  const goPrev = () => {
    timerRef.current && clearTimeout(timerRef.current)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    if (current > 0) setCurrent((c) => c - 1)
    else onClose()
  }

  // Click/tap navigation
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left
    if (x < width / 2) goPrev()
    else goNext()
  }

  // Swipe down to close (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current !== null) {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current
      if (deltaY > 80) onClose()
    }
    touchStartY.current = null
  }

  if (!open || !statuses || statuses.length === 0) return null
  const status = statuses[current]

  return (
    <div
      className='fixed inset-0 z-50 flex select-none items-center justify-center bg-black/60 backdrop-blur-md'
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bar */}
      <div className='absolute left-0 right-0 top-0 z-50 mx-auto max-w-lg gap-1 p-3'>
        <div className='flex gap-1'>
          {statuses.map((_, i) => (
            <div key={i} className='relative h-1 flex-1 overflow-hidden rounded bg-white/30'>
              {i < current && <div className='absolute left-0 top-0 h-full w-full rounded bg-white'></div>}
              {i === current && (
                <div className='absolute left-0 top-0 h-full rounded bg-white' style={{ width: `${progress}%` }}></div>
              )}
            </div>
          ))}
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <div className='mt-2 flex items-center gap-2'>
            <img
              src={user?.profileImage}
              alt='user-avatar'
              className='h-8 w-8 rounded-full border border-white bg-zinc-800 object-cover'
            />
            <div className='flex flex-col'>
              <span className='text-[12px] font-medium text-white drop-shadow'>{user?.name}</span>
              <span className='text-[11px] text-white drop-shadow'>@{user?.username}</span>
            </div>
          </div>
          <button
            type='button'
            aria-label='Close status viewer'
            className='ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-zinc-800/80 shadow-lg backdrop-blur-lg transition-colors duration-150 hover:bg-zinc-700/80'
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X size={20} className='text-white' />
          </button>
        </div>
      </div>
      {/* Content */}
      <div className='relative flex w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-900 p-6 shadow-lg'>
        {/* Gradient overlay for text and image background, responsive to theme */}
        <div className='pointer-events-none absolute inset-0 z-10 rounded-xl bg-gradient-to-b from-white/80 via-white/40 to-transparent dark:from-indigo-900/80 dark:via-purple-800/60 dark:to-transparent'></div>
        {status.image && (
          <img src={status.image.imageUrl} alt='status-img-full' className='z-20 w-full' draggable={false} />
        )}
        {status.text && (
          <div className='z-20 mb-2 flex min-h-[80px] w-full items-center justify-center whitespace-pre-line break-words px-4 text-center text-lg font-semibold text-white'>
            {status.text}
          </div>
        )}
        {/* User info below status lines */}
      </div>
    </div>
  )
}
