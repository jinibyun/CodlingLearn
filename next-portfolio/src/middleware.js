import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/profile')) {
    const cookies = request.cookies.getAll();
    const hasSupabaseAuthCookie = cookies.some(
      ({ name }) => name.includes('sb-') && name.includes('auth-token')
    );

    if (!hasSupabaseAuthCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};