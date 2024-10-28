import axios from 'axios'
import { root } from 'postcss'

export async function follow(username: string) {
  try {
    const response = await axios.post('/api/user/follow/follow', { username })
    console.log(response.data)

    return response.data
  } catch (error: any) {
    console.log(error)

    return error.response.data
  }
}

export async function unfollow(username: string) {
  try {
    const response = await axios.post('/api/user/follow/unfollow', { username })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}

// export async function acceptRequest(friendRequestId: string) {
//   try {
//     console.log(friendRequestId)
//     const response = await axios.post('/api/user/acceptFriendRequest', { friendRequestId })
//     console.log(response)
//     return response.data
//   } catch (error: any) {
//     console.log(error)
//     return error.response.data
//   }
// }

// export async function deleteRequest(friendRequestId: string) {
//   try {
//     const response = await axios.post('/api/user/deleteFriendRequest', { friendRequestId })
//     console.log(response.data)
//     return response.data
//   } catch (error: any) {
//     console.log(error)
//     return error.response.data
//   }
// }

// export async function getFriendRequests() {
//   try {
//     const response = await axios.get('/api/user/getFriendRequests')
//     console.log(response.data)
//     return response.data
//   } catch (error: any) {
//     console.log(error)
//     return error.response.data
//   }
// }

// export async function getSentRequests() {
//   try {
//     const response = await axios.post('/api/user/getSentRequests')
//     console.log(response.data)
//     return response.data
//   } catch (error: any) {
//     console.log(error)
//     return error.response.data
//   }
// }
