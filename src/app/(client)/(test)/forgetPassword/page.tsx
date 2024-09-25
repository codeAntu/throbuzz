'use client'

import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import axios from 'axios'

export default function ForgetPasswordPage() {
  const password = '123456789'

  async function forgetPassword() {
    try {
      const response = await axios.post('/api/auth/forgetPassword', {
        searchKey: 'codeAntu@gmail.com',
      })

      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function forgetPasswordVerify() {
    try {
      const response = await axios.post('/api/auth/forgetPasswordVerify', {
        OTP: '727935',
        newPassword: password,
        confirmPassword: password,
      })

      console.log(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Screen className='gap-10'>
      <div>
        <h1>Forget Password</h1>
      </div>
      <Button onClick={forgetPassword} title='Forget Password' />
      <Button onClick={forgetPasswordVerify} title='Forget Password Verify' />
    </Screen>
  )
}
