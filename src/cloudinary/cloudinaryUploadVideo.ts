import { v2 as cloudinary } from 'cloudinary'

export default async function videoUpload(video: File, folder: string) {
  const buffer = await video.arrayBuffer()
  const bytes = Buffer.from(buffer)

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'video',
          folder: folder,
        },
        async (error: any, result: any) => {
          if (error) {
            return reject(error)
          } else {
            return resolve(result)
          }
        },
      )
      .end(bytes)
  })
}
