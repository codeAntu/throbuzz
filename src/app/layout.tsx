import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import GetMe from '@/components/GetMe'
import { OpenSidebar, Right } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: '500',
})

export const metadata: Metadata = {
  title: 'Throbuzz',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <div className='flex justify-center'>
            <OpenSidebar />
            <div className='hidden w-full max-w-[380px] xl:block'></div>
            {children}
            <div className='hidden w-full max-w-[380px] 2xl:block'></div>
            <Right />
          </div>
          <GetMe />
        </ThemeProvider>
      </body>
    </html>
  )
}
