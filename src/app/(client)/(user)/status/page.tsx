'use client'
import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import StatusMain from '@/components/status/status'

export default function StatusPage() {
  return (
    <Screen0 className=''>
      <Header title='Status' />
      <StatusMain />
    </Screen0>
  )
}
