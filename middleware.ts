import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // 处理呼吸练习页面的重定向
  if (url.pathname === '/breathing' || url.pathname === '/breathing/') {
    const newUrl = '/breathing-exercise' + url.search + url.hash
    return NextResponse.redirect(new URL(newUrl, request.url), {
      status: 301,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  }

  // 如果 URL 以 / 结尾，重定向到无 / 的版本
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const newUrl = url.pathname.slice(0, -1) + url.search + url.hash
    return NextResponse.redirect(new URL(newUrl, request.url), {
      status: 301,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}