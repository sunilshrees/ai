import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')
  const isAuthenticated = !!token

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (isAuthenticated && request.nextUrl.pathname == '/login') {
    return NextResponse.redirect(
      new URL('/dashboard/home/hero-section', request.url),
    )
  }
}
