import { NextRequest, NextResponse } from "next/server"

// シンプルな認証チェック用のミドルウェア（Next-auth無効化中）
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 認証不要なパス
  const publicPaths = [
    '/login',
    '/register', 
    '/resetpassword',
    '/api',
    '/',
    '/landing'
  ]
  
  // パブリックパスは通す
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }
  
  // 現在は全てのルートを通す（認証は後で実装）
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 以下のパスで始まるものを除く全てのパスにマッチ:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}