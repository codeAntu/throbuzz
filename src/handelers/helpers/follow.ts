import { follow, unfollow } from '../social/social'

export async function handleFollow(id: string, setFollowed: any, setLoading: any) {
  setFollowed(true)
  console.log(id)
  setLoading(true)
  const response = await follow(id)
  if (response.error) {
    console.error(response.error)
    setFollowed(false)
    return
  }
  setFollowed(true)
  console.log(response)
  setLoading(false)
}

export async function handleUnFollow(id: string, setFollowed: any, setLoading: any) {
  setFollowed(false)
  console.log(id)
  setLoading(true)

  const response = await unfollow(id)
  if (response.error) {
    console.log(response.error)
    setFollowed(true)
    return
  }
  console.log(response)
  setFollowed(false)
  setLoading(false)
}
