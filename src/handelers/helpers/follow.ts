import { follow, unfollow } from '../social/social'

export async function handleFollow(username: string, setFollowed: any) {
  setFollowed(true)
  const response = await follow(username)
  if (response.error) {
    console.error(response.error)
    setFollowed(false)
    return
  }
  setFollowed(true)
  console.log(response)
}

export async function handleUnFollow(username: string, setFollowed: any) {
  setFollowed(false)
  console.log(username)

  const response = await unfollow(username)
  if (response.error) {
    console.log(response.error)
    setFollowed(true)
    return
  }
  setFollowed(false)
}
