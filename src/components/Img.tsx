/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import { CldImage } from 'next-cloudinary'

export default function Img({
  imageUrl,
  publicId,
  imageAlt = 'image',
  height,
  width,
  className = '',
}: {
  imageUrl: string
  publicId: string
  imageAlt?: string
  height: number
  width: number
  className?: string
}) {
  return (
    <div className={`aspect-square w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10 ${className}`}>
      {publicId ? (
        <CldImage
          src={publicId}
          alt={imageAlt}
          width={width}
          height={height}
          // quality='auto'
          // loading='lazy'
          // dpr='auto'
          // crop='fill'
          // gravity='auto'
          // className='rounded-lg'
          className='aspect-square w-full rounded-full object-cover'
        />
      ) : (
        <>
          <img src={imageUrl || '/icons/user.png'} alt={imageAlt} className='rounded-full bg-transparent dark:hidden' />
          <img
            src={imageUrl || '/icons/user_dark.png'}
            alt=''
            className='hidden rounded-full bg-transparent dark:block'
          />
        </>
      )}
    </div>
  )
}
