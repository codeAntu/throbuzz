import { Screen } from '@/components/Screen'
import ProfileLayout from '../layout'

export default function userProfile({ params }: { params: any }) {
  return (
    <Screen>
      <Bio />
    </Screen>
  )
}

function Bio() {
  return (
    <div>
      <img src='./images/profile.jpg' alt='' className='bg-white p-7' />
      <img src='./icons/github.png' alt='' />
    </div>
  )
}
