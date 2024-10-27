import { acceptRequest, deleteRequest } from '../social/social'

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
