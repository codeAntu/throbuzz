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
}: {
  imageUrl: string
  publicId: string
  imageAlt?: string
  height: number
  width: number
}) {
  return (
    <div>
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
        />
      ) : (
        <>
          <img src='/icons/user.png' alt={imageAlt} className='bg-transparent dark:hidden' />
          <img src='/icons/user_dark.png' alt='' className='hidden bg-transparent dark:block' />
        </>
      )}
    </div>
  )
}
