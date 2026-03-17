import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // No token - redirect to login for protected routes
  if (!token && (request.nextUrl.pathname.startsWith('/dashboard') || 
                 request.nextUrl.pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If we have a token, decode it to get the role
  if (token) {
    try {
      // Simple JWT decode (without verification - just reading the payload)
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );

      const role = payload.role || 'USER';
      const isAdmin = role === 'ADMIN';
      const path = request.nextUrl.pathname;

      // Admin trying to access user dashboard - redirect to admin
      if (isAdmin && path.startsWith('/dashboard') && !path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      // Regular user trying to access admin panel - redirect to dashboard
      if (!isAdmin && path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // Invalid token - redirect to login
      if (request.nextUrl.pathname.startsWith('/dashboard') || 
          request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
