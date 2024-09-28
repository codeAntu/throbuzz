import { any } from 'zod'

export function Ic({ Icon, size, ...rest }: any) {
  return <Icon className='text-black/50 dark:text-white/50' size={size || 20} {...rest} />
}

// export function Icon({ Icon,  ...rest }: any) {
//   return <Icon className='text-black/50 dark:text-white/50' size={20} {...rest} />
// }
