import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { TokenDataT } from './lib/types'

export async function middleware(request: NextRequest) {
  console.log('This is middleware')

  // const path = request.nextUrl.pathname

  // const profilePath = path === '/profile'
  // const isPublicPath = path === '/login' || path === '/signup' || path === '/verification'
  // const isVerificationPath = path === '/verification'

  // const token = (await request.cookies.get('token')?.value) || ''
  // const tokenData = jwt.decode(token) as TokenDataT

  // if (isPublicPath && tokenData?.isVerified) {
  //   return NextResponse.redirect(new URL('/', request.nextUrl))
  // }

  // if (!isPublicPath && !tokenData?.isVerified) {
  //   return NextResponse.redirect(new URL('/login', request.nextUrl.origin).toString())
  // }

  // if (profilePath && tokenData?.isVerified) {
  //   return NextResponse.redirect(new URL('/profile/' + tokenData?.username, request.nextUrl.origin).toString())
  // }

  // if (isVerificationPath && tokenData?.isVerified) {
  //   return NextResponse.redirect(new URL('/signup', request.nextUrl.origin).toString())
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ['/', '/login', '/signup', '/profile', '/verification'],
}
