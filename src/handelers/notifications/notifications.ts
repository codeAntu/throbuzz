import axios from 'axios'

export async function gteNotifications() {
  try {
    const response = await axios.post('/api/notifications/getNotifications')
    console.log(response)
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}
