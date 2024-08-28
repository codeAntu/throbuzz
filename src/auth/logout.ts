import axios from 'axios'

export async function onLogOut(clearSavedUser: () => void, router: { push: (arg0: string) => void }) {
  try {
    const response = await axios.post('/api/users/logout')

    console.log('response', response.data.message)
    clearSavedUser()
    router.push('/login')
  } catch (error) {}
}
