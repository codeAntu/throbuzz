import { SetStateAction } from 'react'
import { Ic } from './Icon'
import { Eye, EyeOff } from 'lucide-react'

export function togglePasswordVisibility(
  hidePassword: boolean,
  setHidePassword: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  focusPassword: () => void,
) {
  return hidePassword ? (
    <Ic
      Icon={Eye}
      onClick={() => {
        setHidePassword(false)
        focusPassword()
      }}
      className='cursor-pointer'
    />
  ) : (
    <Ic
      Icon={EyeOff}
      onClick={() => {
        setHidePassword(true)
        focusPassword()
      }}
      className='cursor-pointer'
    />
  )
}
