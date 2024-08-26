import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export async function middleware(request: NextRequest) {
  console.log('This is middleware')

  const path = request.nextUrl.pathname

  const profilePath = path === '/profile'
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verify'

  const token = (await request.cookies.get('token')?.value) || ''
  let tokenData
  try {
    tokenData = jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error) {
    // Handle invalid token, e.g., by redirecting to login
    console.log('Invalid token', error)
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin).toString())
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/signup', '/profile', '/verify'],
}
