import axios from 'axios'

export async function getFollowers(userName: string) {
  try {
    const response = await axios.post('/api/user/follow/getFollowers', {
      username: userName,
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.log(error)

    return error.response.data
  }
}


export async function getFollowing(userName: string) {
  try {
    const response = await axios.post('/api/user/follow/getFollowing', {
      username: userName,
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.log(error)

    return error.response.data
  }
}