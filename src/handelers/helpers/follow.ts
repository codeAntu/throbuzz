import { acceptRequest, deleteRequest, follow, unfollow } from '../social/social'

export async function handleAcceptRequest(id: string, setIsAccepted: any) {
  setIsAccepted(true)
  const response = await acceptRequest(id)
  console.log(response)
  if (response.error) {
    setIsAccepted(false)
    return
  }
}

export async function handleDeleteRequest(id: string, setIsDeleted: any) {
  setIsDeleted(true)
  const response = await deleteRequest(id)
  console.log(response)
  if (response.error) {
    setIsDeleted(false)
    return
  }
}

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

export async function handleUnFollow(username: string, setUnfollow: any) {
  setUnfollow(true)
  console.log(username)

  const response = await unfollow(username)
  if (response.error) {
    console.log(response.error)
    setUnfollow(false)
    return
  }
  setUnfollow(true)
}
