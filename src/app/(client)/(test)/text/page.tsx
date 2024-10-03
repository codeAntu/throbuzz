'use client'

import { Minus, Plus } from 'lucide-react'
import * as React from 'react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Screen } from '@/components/Screen'

export default function Page() {
  return (
    <Screen>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='outline'>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='max-h-[90dvh] min-h-[50dvh] bg-red-400'>
            <div className='h-[35dvh] bg-blue-300'>Hello </div>
            <div className='h-[35dvh] bg-blue-300'>Hello </div>
          </div>
        </DrawerContent>
      </Drawer>
    </Screen>
  )
}

// return (
//   <Drawer>
//     <DrawerTrigger asChild>
//       <Button variant='outline'>Open Drawer</Button>
//     </DrawerTrigger>
//     <DrawerContent>
//       <div className='mx-auto w-full max-w-sm'>
//         <DrawerHeader>
//           <DrawerTitle>Move Goal</DrawerTitle>
//           <DrawerDescription>Set your daily activity goal.</DrawerDescription>
//         </DrawerHeader>
//         <div className='p-4 pb-0'>
//           <div className='flex items-center justify-center space-x-2'>
//             <Button variant='outline' size='icon' className='h-8 w-8 shrink-0 rounded-full'>
//               <Minus className='h-4 w-4' />
//               <span className='sr-only'>Decrease</span>
//             </Button>
//             <div className='flex-1 text-center'>
//               <div className='text-muted-foreground text-[0.70rem] uppercase'>Calories/day</div>
//             </div>
//             <Button variant='outline' size='icon' className='h-8 w-8 shrink-0 rounded-full'>
//               <Plus className='h-4 w-4' />
//               <span className='sr-only'>Increase</span>
//             </Button>
//           </div>
//           <div className='mt-3 h-[120px]'>
//             <ResponsiveContainer width='100%' height='100%'>
//               <BarChart>
//                 <Bar
//                   dataKey='goal'
//                   style={
//                     {
//                       fill: 'hsl(var(--foreground))',
//                       opacity: 0.9,
//                     } as React.CSSProperties
//                   }
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//         <DrawerFooter>
//           <Button>Submit</Button>
//           <DrawerClose asChild>
//             <Button variant='outline'>Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </div>
//     </DrawerContent>
//   </Drawer>
// )
