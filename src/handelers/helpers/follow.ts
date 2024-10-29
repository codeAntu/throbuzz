import { follow, unfollow } from '../social/social'

export async function handleFollow(id: string, setFollowed: any) {
  setFollowed(true)
  const response = await follow(id)
  if (response.error) {
    console.error(response.error)
    setFollowed(false)
    return
  }
  setFollowed(true)
  console.log(response)
}

export async function handleUnFollow(id: string, setFollowed: any) {
  setFollowed(false)
  console.log(id)

  const response = await unfollow(id)
  if (response.error) {
    console.log(response.error)
    setFollowed(true)
    return
  }
  setFollowed(false)
}
