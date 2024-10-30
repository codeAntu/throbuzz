import useStore from '@/store/store'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export async function logOut(onLogOut: Function) {
  try {
    const response = await axios.post('/api/auth/logout')
    console.log('response', response.data.message)
    onLogOut()
    return response.data
  } catch (error: any) {
    console.error(error)
    return error.response.data
  }
}
