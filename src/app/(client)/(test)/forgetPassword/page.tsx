'use client'

import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'

export default function ForgetPasswordPage() {
  async function forgetPassword() {
    try {
      const response = await axios.post('/api/auth/forgetPassword', {
        searchKey: 'codeAntu@gmail.com',
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Screen className='gap-10'>
      <div>
        <h1>Forget Password</h1>
      </div>
      <Button onClick={forgetPassword} title='Forget Password'></Button>
    </Screen>
  )
}
