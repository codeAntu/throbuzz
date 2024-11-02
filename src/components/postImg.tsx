/* eslint-disable @next/next/no-img-element */
'use client'
import { CldImage } from 'next-cloudinary'

export default function PostImg({ imageUrl, alt, publicId }: { imageUrl: string; alt: string; publicId: string }) {
  return (
    <div onContextMenu={(e: { preventDefault: () => any }) => e.preventDefault()}>
      {publicId ? (
        <CldImage
          src={publicId}
          alt={alt}
          width={400}
          height={400}
          className='aspect-video w-full cursor-pointer rounded-xl object-cover transition-all duration-300 active:object-contain'
        />
      ) : (
        // <img
        //   src={imageUrl}
        //   alt={alt}
        //   className='aspect-video w-full cursor-pointer rounded-xl object-cover transition-all duration-300 active:object-contain'
        // />
        <div></div>
      )}
    </div>
  )
}
